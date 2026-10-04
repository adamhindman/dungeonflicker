#!/usr/bin/env bash
#
# wav2mp3.sh - Convert WAV files to MP3 using ffmpeg (LAME encoder).
#
# Usage:
#   ./wav2mp3.sh [options] [file-or-directory ...]
#
# Options:
#   -q N    VBR quality 0-9 (0 = best, default 2 ~190 kbps)
#   -b K    Constant bitrate in kbps instead of VBR (e.g. 320)
#   -o DIR  Output directory (default: next to each source file)
#   -r      Recurse into subdirectories
#   -f      Overwrite existing MP3s (default: skip them)
#   -d      Delete the WAV after a successful conversion
#   -h      Show this help
#
# With no paths given, converts WAVs in the current directory.

set -euo pipefail

quality=2
bitrate=""
outdir=""
recursive=0
overwrite=0
delete_src=0

usage() { sed -n '3,19p' "$0" | sed 's/^# \{0,1\}//'; exit "${1:-0}"; }

while getopts ":q:b:o:rfdh" opt; do
  case "$opt" in
    q) quality="$OPTARG" ;;
    b) bitrate="$OPTARG" ;;
    o) outdir="$OPTARG" ;;
    r) recursive=1 ;;
    f) overwrite=1 ;;
    d) delete_src=1 ;;
    h) usage 0 ;;
    :) echo "Option -$OPTARG needs a value." >&2; usage 1 ;;
    \?) echo "Unknown option -$OPTARG" >&2; usage 1 ;;
  esac
done
shift $((OPTIND - 1))

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg not found. Install it (e.g. 'brew install ffmpeg' or 'sudo apt install ffmpeg')." >&2
  exit 1
fi

[[ $# -eq 0 ]] && set -- .
[[ -n "$outdir" ]] && mkdir -p "$outdir"

if [[ -n "$bitrate" ]]; then
  enc_opts=(-b:a "${bitrate}k")
else
  enc_opts=(-q:a "$quality")
fi

converted=0; skipped=0; failed=0

convert() {
  local src="$1"
  local base="${src##*/}"
  base="${base%.*}"
  local dest_dir="${outdir:-$(dirname "$src")}"
  local dest="$dest_dir/$base.mp3"

  if [[ -e "$dest" && $overwrite -eq 0 ]]; then
    echo "skip  $dest (exists)"
    skipped=$((skipped + 1))
    return
  fi

  echo "conv  $src -> $dest"
  if ffmpeg -hide_banner -loglevel error -nostdin -y -i "$src" \
       -vn -codec:a libmp3lame "${enc_opts[@]}" -map_metadata 0 "$dest"; then
    converted=$((converted + 1))
    if [[ $delete_src -eq 1 ]]; then
      rm -- "$src"
    fi
  else
    echo "FAIL  $src" >&2
    rm -f -- "$dest"
    failed=$((failed + 1))
  fi
}

for path in "$@"; do
  if [[ -d "$path" ]]; then
    depth=(-maxdepth 1)
    [[ $recursive -eq 1 ]] && depth=()
    while IFS= read -r -d '' f; do
      convert "$f"
    done < <(find "$path" "${depth[@]}" -type f -iname '*.wav' -print0 | sort -z)
  elif [[ -f "$path" ]]; then
    convert "$path"
  else
    echo "Not found: $path" >&2
    failed=$((failed + 1))
  fi
done

echo "Done: $converted converted, $skipped skipped, $failed failed."
[[ $failed -eq 0 ]]
