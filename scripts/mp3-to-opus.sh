#!/bin/bash
# Recursively convert every .mp3 under the current directory to .opus
# (Ogg Opus), writing each one next to its source. MP3s are left in place.
#
# Usage: mp3-to-opus.sh [-f] [bitrate]
#   -f       overwrite .opus files that already exist (default: skip them)
#   bitrate  Opus target bitrate, default 48k (plenty for short effects;
#            the source MP3s are mostly 64k mono)

set -u

# Needs bash (read -d ''); hand over to it if started from another shell like dash.
[ -n "${BASH_VERSION:-}" ] || exec bash "$0" "$@"

overwrite=0
if [ "${1:-}" = "-f" ]; then
  overwrite=1
  shift
fi
bitrate="${1:-48k}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found (brew install ffmpeg)" >&2
  exit 1
fi

# Piped rather than `done < <(find ...)` so it also runs under `sh`; the
# braces keep the counters and the summary in the same subshell.
find . -type f -iname '*.mp3' -print0 | {
converted=0 skipped=0 failed=0

while IFS= read -r -d '' src; do
  dest="${src%.*}.opus"

  if [ -e "$dest" ] && [ "$overwrite" -eq 0 ]; then
    echo "skip  $dest (exists)"
    skipped=$((skipped + 1))
    continue
  fi

  # -nostdin: don't let ffmpeg swallow the file list on stdin.
  # -vn / -map_metadata -1: drop cover art and tags.
  # -vbr constrained: stay near the bitrate (plain VBR can run far over it).
  if ffmpeg -nostdin -hide_banner -loglevel error -y -i "$src" \
       -vn -map_metadata -1 -c:a libopus -b:a "$bitrate" -vbr constrained "$dest"; then
    echo "ok    $dest"
    converted=$((converted + 1))
  else
    echo "FAIL  $src" >&2
    rm -f "$dest"
    failed=$((failed + 1))
  fi
done

echo
echo "converted $converted, skipped $skipped, failed $failed"
[ "$failed" -eq 0 ]
}
