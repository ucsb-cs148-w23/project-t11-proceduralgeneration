import m0 from "./starterTiles/default.glb"
import m1 from "./starterTiles/doorblock.glb"
import m2 from "./starterTiles/roofedge.glb"
import m3 from "./starterTiles/roofside.glb"
import m4 from "./starterTiles/stair.glb"
import m5 from "./starterTiles/twowindow.glb"
import m6 from "./starterTiles/twowindowsimp.glb"
import m7 from "./starterTiles/onewayroad.glb"
import m8 from "./starterTiles/twowayroad.glb"

const fileTileMap = {
  "default.gltf": m0,
  "doorblock.gltf": m1,
  "roofedge.gltf": m2,
  "roofside.gltf": m3,
  "stair.gltf": m4,
  "twowindow.gltf": m5,
  "twowindowsimp.gltf": m6,
  "onewayroad.gltf": m7,
  "twowayroad.gltf": m8
};

const defaultExpanded = {
    "proto_0": {
        "mesh": "default.gltf",
        "rotation": 0,
        "ground": true,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4"
            ]
        }
    },
    "proto_1": {
        "mesh": "doorblock.gltf",
        "rotation": 0,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "1_s",
            "nz": "1_0",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_3"
            ],
            "nz": [
                "proto_0"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_2": {
        "mesh": "doorblock.gltf",
        "rotation": 1,
        "sockets": {
            "nx": "0_s",
            "px": "1_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "1_1",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_4"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_3": {
        "mesh": "doorblock.gltf",
        "rotation": 2,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "1_s",
            "py": "0_s",
            "nz": "1_2",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_1"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_4": {
        "mesh": "doorblock.gltf",
        "rotation": 3,
        "sockets": {
            "nx": "1_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "1_3",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_2"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_5": {
        "mesh": "roofedge.gltf",
        "rotation": 0,
        "sockets": {
            "nx": "2",
            "px": "3_s",
            "ny": "2_f",
            "py": "3_s",
            "nz": "0_i",
            "pz": "4_0"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_8",
                "proto_9"
            ],
            "px": [
                "proto_28",
                "proto_7",
                "proto_8",
                "proto_12",
                "proto_16"
            ],
            "ny": [
                "proto_28",
                "proto_6",
                "proto_10"
            ],
            "py": [
                "proto_28",
                "proto_6",
                "proto_7",
                "proto_11",
                "proto_15"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_6": {
        "mesh": "roofedge.gltf",
        "rotation": 1,
        "sockets": {
            "nx": "2_f",
            "px": "3_s",
            "ny": "3_s",
            "py": "2",
            "nz": "0_i",
            "pz": "4_1"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_7",
                "proto_11"
            ],
            "px": [
                "proto_28",
                "proto_7",
                "proto_8",
                "proto_12",
                "proto_16"
            ],
            "ny": [
                "proto_28",
                "proto_5",
                "proto_8",
                "proto_9",
                "proto_13"
            ],
            "py": [
                "proto_28",
                "proto_5",
                "proto_10"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_7": {
        "mesh": "roofedge.gltf",
        "rotation": 2,
        "sockets": {
            "nx": "3_s",
            "px": "2",
            "ny": "3_s",
            "py": "2_f",
            "nz": "0_i",
            "pz": "4_2"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_5",
                "proto_6",
                "proto_10",
                "proto_14"
            ],
            "px": [
                "proto_28",
                "proto_6",
                "proto_11"
            ],
            "ny": [
                "proto_28",
                "proto_5",
                "proto_8",
                "proto_9",
                "proto_13"
            ],
            "py": [
                "proto_28",
                "proto_8",
                "proto_12"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_8": {
        "mesh": "roofedge.gltf",
        "rotation": 3,
        "sockets": {
            "nx": "3_s",
            "px": "2_f",
            "ny": "2",
            "py": "3_s",
            "nz": "0_i",
            "pz": "4_3"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_5",
                "proto_6",
                "proto_10",
                "proto_14"
            ],
            "px": [
                "proto_28",
                "proto_5",
                "proto_9"
            ],
            "ny": [
                "proto_28",
                "proto_7",
                "proto_12"
            ],
            "py": [
                "proto_28",
                "proto_6",
                "proto_7",
                "proto_11",
                "proto_15"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_9": {
        "mesh": "roofside.gltf",
        "rotation": 0,
        "sockets": {
            "nx": "2",
            "px": "2_f",
            "ny": "0_s",
            "py": "3_s",
            "nz": "0_i",
            "pz": "5_0"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_8",
                "proto_9",
                "proto_9"
            ],
            "px": [
                "proto_28",
                "proto_5",
                "proto_9",
                "proto_9"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_6",
                "proto_7",
                "proto_11",
                "proto_15"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_10": {
        "mesh": "roofside.gltf",
        "rotation": 1,
        "sockets": {
            "nx": "0_s",
            "px": "3_s",
            "ny": "2_f",
            "py": "2",
            "nz": "0_i",
            "pz": "5_2"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_7",
                "proto_8",
                "proto_12",
                "proto_16"
            ],
            "ny": [
                "proto_28",
                "proto_6",
                "proto_10",
                "proto_10"
            ],
            "py": [
                "proto_28",
                "proto_5",
                "proto_10",
                "proto_10"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_11": {
        "mesh": "roofside.gltf",
        "rotation": 2,
        "sockets": {
            "nx": "2_f",
            "px": "2",
            "ny": "3_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "5_2"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_7",
                "proto_11",
                "proto_11"
            ],
            "px": [
                "proto_28",
                "proto_6",
                "proto_11",
                "proto_11"
            ],
            "ny": [
                "proto_28",
                "proto_5",
                "proto_8",
                "proto_9",
                "proto_13"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_12": {
        "mesh": "roofside.gltf",
        "rotation": 3,
        "sockets": {
            "nx": "3_s",
            "px": "0_s",
            "ny": "2",
            "py": "2_f",
            "nz": "0_i",
            "pz": "5_3"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_5",
                "proto_6",
                "proto_10",
                "proto_14"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_7",
                "proto_12",
                "proto_12"
            ],
            "py": [
                "proto_28",
                "proto_8",
                "proto_12",
                "proto_12"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_13": {
        "mesh": "stair.gltf",
        "rotation": 0,
        "sockets": {
            "nx": "6",
            "px": "6_f",
            "ny": "0_s",
            "py": "3_s",
            "nz": "0_i",
            "pz": "5_0"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_13",
                "proto_13"
            ],
            "px": [
                "proto_28",
                "proto_13",
                "proto_13"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_6",
                "proto_7",
                "proto_11",
                "proto_15"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_14": {
        "mesh": "stair.gltf",
        "rotation": 1,
        "sockets": {
            "nx": "0_s",
            "px": "3_s",
            "ny": "6_f",
            "py": "6",
            "nz": "0_i",
            "pz": "5_2"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_7",
                "proto_8",
                "proto_12",
                "proto_16"
            ],
            "ny": [
                "proto_28",
                "proto_14",
                "proto_14"
            ],
            "py": [
                "proto_28",
                "proto_14",
                "proto_14"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_15": {
        "mesh": "stair.gltf",
        "rotation": 2,
        "sockets": {
            "nx": "6_f",
            "px": "6",
            "ny": "3_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "5_2"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_15",
                "proto_15"
            ],
            "px": [
                "proto_28",
                "proto_15",
                "proto_15"
            ],
            "ny": [
                "proto_28",
                "proto_5",
                "proto_8",
                "proto_9",
                "proto_13"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_16": {
        "mesh": "stair.gltf",
        "rotation": 3,
        "sockets": {
            "nx": "3_s",
            "px": "0_s",
            "ny": "6",
            "py": "6_f",
            "nz": "0_i",
            "pz": "5_3"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_5",
                "proto_6",
                "proto_10",
                "proto_14"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_16",
                "proto_16"
            ],
            "py": [
                "proto_28",
                "proto_16",
                "proto_16"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_17": {
        "mesh": "twowindow.gltf",
        "rotation": 0,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "7_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_19"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_18": {
        "mesh": "twowindow.gltf",
        "rotation": 1,
        "sockets": {
            "nx": "0_s",
            "px": "7_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_20"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_19": {
        "mesh": "twowindow.gltf",
        "rotation": 2,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "7_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_17"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_20": {
        "mesh": "twowindow.gltf",
        "rotation": 3,
        "sockets": {
            "nx": "7_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_18"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_21": {
        "mesh": "twowindowsimp.gltf",
        "rotation": 0,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "8_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_23"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_22": {
        "mesh": "twowindowsimp.gltf",
        "rotation": 1,
        "sockets": {
            "nx": "0_s",
            "px": "8_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_24"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_23": {
        "mesh": "twowindowsimp.gltf",
        "rotation": 2,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "8_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_23",
                "proto_24",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_21"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_24": {
        "mesh": "twowindowsimp.gltf",
        "rotation": 3,
        "sockets": {
            "nx": "8_s",
            "px": "0_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "0_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_22"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_24",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_24",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_24"
            ],
            "pz": [
                "proto_28",
                "proto_0",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ]
        }
    },
    "proto_25": {
        "mesh": "onewayroad.gltf",
        "rotation": 0,
        "ground": true,
        "sockets": {
            "nx": "0_s",
            "px": "0_s",
            "ny": "10_s",
            "py": "10_s",
            "nz": "0_i",
            "pz": "9_0"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_3",
                "proto_4",
                "proto_12",
                "proto_16",
                "proto_17",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_25"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_10",
                "proto_14",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_25",
                "proto_25"
            ],
            "ny": [
                "proto_28",
                "proto_25",
                "proto_25",
                "proto_27"
            ],
            "py": [
                "proto_28",
                "proto_25",
                "proto_25",
                "proto_27"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_26": {
        "mesh": "onewayroad.gltf",
        "rotation": 1,
        "ground": true,
        "sockets": {
            "nx": "10_s",
            "px": "10_s",
            "ny": "0_s",
            "py": "0_s",
            "nz": "0_i",
            "pz": "9_1"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_26",
                "proto_26",
                "proto_27"
            ],
            "px": [
                "proto_28",
                "proto_26",
                "proto_26",
                "proto_27"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_11",
                "proto_15",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_26",
                "proto_26"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_4",
                "proto_9",
                "proto_13",
                "proto_17",
                "proto_18",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_24",
                "proto_26",
                "proto_26"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_27": {
        "mesh": "twowayroad.gltf",
        "rotation": 0,
        "ground": true,
        "sockets": {
            "nx": "10_s",
            "px": "10_s",
            "ny": "10_s",
            "py": "10_s",
            "nz": "0_i",
            "pz": "11_i"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_26",
                "proto_27",
                "proto_27"
            ],
            "px": [
                "proto_28",
                "proto_26",
                "proto_27",
                "proto_27"
            ],
            "ny": [
                "proto_28",
                "proto_25",
                "proto_27",
                "proto_27"
            ],
            "py": [
                "proto_28",
                "proto_25",
                "proto_27",
                "proto_27"
            ],
            "nz": [
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24"
            ],
            "pz": [
                "proto_28"
            ]
        }
    },
    "proto_28": {
        "mesh": "",
        "rotation": 0,
        "sockets": {
            "nx": "-1",
            "px": "-1",
            "ny": "-1",
            "py": "-1",
            "nz": "-1",
            "pz": "-1"
        },
        "valid_neighbors": {
            "nx": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ],
            "px": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ],
            "ny": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ],
            "py": [
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ],
            "nz": [
                "proto_28",
                "proto_28",
                "proto_28",
                "proto_0",
                "proto_1",
                "proto_2",
                "proto_3",
                "proto_4",
                "proto_5",
                "proto_6",
                "proto_7",
                "proto_8",
                "proto_9",
                "proto_10",
                "proto_11",
                "proto_12",
                "proto_13",
                "proto_14",
                "proto_15",
                "proto_16",
                "proto_17",
                "proto_18",
                "proto_19",
                "proto_20",
                "proto_21",
                "proto_22",
                "proto_23",
                "proto_24",
                "proto_25",
                "proto_26",
                "proto_27"
            ],
            "pz": [
                "proto_28",
                "proto_28",
                "proto_28"
            ]
        }
    }
};

const defaultCollapsed = {
    "proto_0": {
        "mesh": "default.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 0
            },
            "px": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 2,
                "proto_9": 1,
                "proto_13": 1,
                "proto_17": 2,
                "proto_21": 2,
                "proto_25": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 2,
                "proto_13": 2,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "py": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 0,
                "proto_13": 0,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0,
                "proto_1": 3
            }
        },
        "weight": 1,
        "ground": true
    },
    "proto_1": {
        "mesh": "doorblock.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 0
            },
            "px": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 2,
                "proto_9": 1,
                "proto_13": 1,
                "proto_17": 2,
                "proto_21": 2,
                "proto_25": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 2,
                "proto_13": 2,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "py": {
                "proto_28": 0,
                "proto_1": 2
            },
            "nz": {
                "proto_0": 0
            },
            "pz": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            }
        },
        "weight": 1
    },
    "proto_5": {
        "mesh": "roofedge.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_5": 3,
                "proto_9": 0
            },
            "px": {
                "proto_28": 0,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3
            },
            "ny": {
                "proto_28": 0,
                "proto_5": 1,
                "proto_9": 1
            },
            "py": {
                "proto_28": 0,
                "proto_5": 2,
                "proto_9": 2,
                "proto_13": 2
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0
            }
        },
        "weight": 1
    },
    "proto_9": {
        "mesh": "roofside.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_5": 3,
                "proto_9": 0
            },
            "px": {
                "proto_28": 0,
                "proto_5": 0,
                "proto_9": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 2,
                "proto_13": 2,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "py": {
                "proto_28": 0,
                "proto_5": 2,
                "proto_9": 2,
                "proto_13": 2
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0
            }
        },
        "weight": 1
    },
    "proto_13": {
        "mesh": "stair.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_13": 0
            },
            "px": {
                "proto_28": 0,
                "proto_13": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 2,
                "proto_13": 2,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "py": {
                "proto_28": 0,
                "proto_5": 2,
                "proto_9": 2,
                "proto_13": 2
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0
            }
        },
        "weight": 1
    },
    "proto_17": {
        "mesh": "twowindow.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 0
            },
            "px": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 2,
                "proto_9": 1,
                "proto_13": 1,
                "proto_17": 2,
                "proto_21": 2,
                "proto_25": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 2,
                "proto_13": 2,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "py": {
                "proto_28": 0,
                "proto_17": 2
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            }
        },
        "weight": 1
    },
    "proto_21": {
        "mesh": "twowindowsimp.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 0
            },
            "px": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 2,
                "proto_9": 1,
                "proto_13": 1,
                "proto_17": 2,
                "proto_21": 2,
                "proto_25": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 2,
                "proto_13": 2,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1
            },
            "py": {
                "proto_28": 0,
                "proto_21": 2
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            }
        },
        "weight": 1
    },
    "proto_25": {
        "mesh": "onewayroad.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 0
            },
            "px": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 2,
                "proto_9": 1,
                "proto_13": 1,
                "proto_17": 2,
                "proto_21": 2,
                "proto_25": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_25": 0,
                "proto_27": 0
            },
            "py": {
                "proto_28": 0,
                "proto_25": 0,
                "proto_27": 0
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0
            }
        },
        "weight": 1,
        "ground": true
    },
    "proto_27": {
        "mesh": "twowayroad.gltf",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_25": 1,
                "proto_27": 0
            },
            "px": {
                "proto_28": 0,
                "proto_25": 1,
                "proto_27": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_25": 0,
                "proto_27": 0
            },
            "py": {
                "proto_28": 0,
                "proto_25": 0,
                "proto_27": 0
            },
            "nz": {
                "proto_0": 0,
                "proto_1": 3,
                "proto_17": 3,
                "proto_21": 3
            },
            "pz": {
                "proto_28": 0
            }
        },
        "weight": 1,
        "ground": true
    },
    "proto_28": {
        "mesh": "",
        "rotation": 0,
        "valid_neighbors": {
            "nx": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            },
            "px": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            },
            "ny": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            },
            "py": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            },
            "nz": {
                "proto_28": 0,
                "proto_0": 0,
                "proto_1": 3,
                "proto_5": 3,
                "proto_9": 3,
                "proto_13": 3,
                "proto_17": 3,
                "proto_21": 3,
                "proto_25": 1,
                "proto_27": 0
            },
            "pz": {
                "proto_28": 0
            }
        },
        "weight": 1
    }
}

export { fileTileMap, defaultCollapsed, defaultExpanded };
