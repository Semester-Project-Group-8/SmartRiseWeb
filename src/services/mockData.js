export const mockUsers = [
    {
        id: "user-001",
        name: "Marija",
        surname: "Savkina",
        height: 161,
        sitPreset: 70,
        standPreset: 100,
        role: "user",
        approval: "approved",
        assignedDeskID: "desk-002",
    },
    {
        id: "user-002",
        name: "Johm",
        surname: "Smith",
        height: 198,
        sitPreset: 90,
        standPreset: 120,
        role: "user",
        approval: "pending",
        assignedDeskID: null,
    },
    {
        id: "user-003",
        name: "Carl",
        surname: "Straw",
        height: 180,
        sitPreset: null,
        standPreset: null,
        role: "admin",
        approval: "approved",
        assignedDeskID: null,
    },
    {
        id: "user-004",
        name: "Shane",
        surname: "Blub",
        height: 176,
        sitPreset: null,
        standPreset: null,
        role: "cleaner",
        approval: "approved",
        assignedDeskID: null,
    }
];

export const mockDesks = [
    {
        id: "desk-001",
        deskNum: 1,
        currentHeight: 80,
        isConnected: false,
        assignedUserID: null,
        picoID: "pico-001",
    },
    {
        id: "desk-002",
        deskNum: 2,
        currentHeight: 70,
        isConnected: true,
        assignedUserID: "user-001",
        picoID: "pico-001",
    }
];

export const mockPicos = [
    {
        id: "pico-001",
        deskIDs: ["desk-001", "desk-002"]
    }
];