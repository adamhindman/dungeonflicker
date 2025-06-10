const levelConfigurations = [
  {
    id: "level1_arena",
    name: "The Arena of Trials",
    description: "A basic arena with a few obstacles to test your skills.",
    fieldDimensions: {
      width: 48, // 32 * 1.5
      depth: 36, // 24 * 1.5
      wallHeight: 4,
    },
    internalWalls: [
      {
        id: "internal_wall_1",
        x: -8, // -fieldWidth / 6
        y: 2, // wallHeight / 2
        z: -11.25, // -fieldDepth / 2 + 13 / 2 + 0.25
        width: 1, // internalWallThickness
        height: 4, // wallHeight
        depth: 13, // internalWallLength
        // rotation: (optional, e.g., { axis: 'y', angle: Math.PI / 2 })
      },
    ],
    obstacles: [
      {
        id: "obstacle_block_1",
        type: "block", // For potential future differentiation
        x: -10,
        y: 2, // wallHeight / 2
        z: 8,
        width: 6, // blockSize
        height: 4, // wallHeight
        depth: 6, // blockSize
      },
      {
        id: "obstacle_block_2",
        type: "block",
        x: 10,
        y: 2, // wallHeight / 2
        z: -8,
        width: 6, // blockSize
        height: 4, // wallHeight
        depth: 6, // blockSize
      },
    ],

    lavaPools: [
      {
        id: "lava_pool_center",
        x: 0,
        z: 0,
        baseRadius: 4,
        vertices: 10,
        irregularity: 0.6,
        spikiness: 0.3,
        // color: 0xff4500 // Optional: if LavaPool class supports custom color
      },
      {
        id: "lava_pool_corner",
        x: 15,
        z: 10,
        baseRadius: 3,
        vertices: 8,
        irregularity: 0.4,
        spikiness: 0.1
      }
    ],
    discs: [],
    // Music track or ambient sound for the level could be added here
    // audio: {
    //   music: "sounds/music_arena.mp3",
    //   ambient: "sounds/ambient_arena.mp3"
    // }
  },
  // Future levels will be added here
  // {
  //   id: "level2_lava_caves",
  //   name: "Molten Corridors",
  //   ... more configuration ...
  // }
];

export default levelConfigurations;