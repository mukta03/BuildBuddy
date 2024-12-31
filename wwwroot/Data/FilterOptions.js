export const filterOptions = {
    cpu: {
        Company: ['Intel', 'AMD'],
        Cores: ['6', '8', '10', '12', '16', '20', '32'],
        Threads: ['12', '16', '24', '28', '32', '64'],
        "Base Clock": ['3.2 GHz', '3.4 GHz', '3.5 GHz', '3.7 GHz', '4.2 GHz', '4.6 GHz', '4.7 GHz'],
        "Boost Clock": ['4.6 GHz', '5.0 GHz', "5.1 GHz", "5.6 GHz", "6 GHz"],
        Socket: ['LGA 1200', 'AM4', 'AM5'],
        Graphics: ['Integrated', 'Discrete', 'Radeon', 'Intel UHD Graphics 770'],
        Unlocked: ['Yes', 'No'],
    },
    gpu: {
        Company: ['MSI', 'Gigabyte', 'Asus', 'XFX', 'Sapphire'],
        "Base Clock": ["1320 MHz", "1830  MHz", "2253  MHz", "2300  MHz", "2000  MHz"],
        "Boost Clock": ['1777', '2505', '2640', '2615', '2450'],
        Memory: ['24 GB', '20 GB', '8 GB', '12 GB', '16 GB'],
        Chipset: ["GeForce RTX 3060", "GeForce RTX 4060", "GeForce RTX 4090", "Radeon RX 7900XT", "Radeon RX 7900XTX"],
        Color: ["Black", "Red"],
    },
    ram: {
        Compnay: ['Corsair', 'G.Skill', 'Kingston', 'Crucial'],
        Capacity: ['4 GB', '8 GB', '16 GB', '32 GB', '64 GB'],
        Speed: ['3200 MHz', '3600 MHz', '4000 MHz', '4400 MHz', '4800 MHz'],
        Type: ['DDR4', 'DDR5'],
        Color: ['Black', 'White', 'Red', 'Blue'],
        RGB: ['Yes', 'No'],
    },
    storage: {
        Company: ['Western Digital', 'Crucial', 'Samsung', 'Seagate'],
        Capacity: ['1 TB', '2 TB', '500 GB'],
        Type: ['SSD', 'HDD'],
    },
    motherboard: {
        Company: ['Gigabyte', 'Asus', 'MSI', 'ASRock'],
        Socket: ['LGA1200', 'AM4'],
        "Form Factor": ['ATX', 'Micro ATX', 'Mini ITX'],
        "Max Memory": ['64 GB', '128 GB', '192 GB', '256 GB', '512 GB'],
        "Memory Support Type": ['DDR5', 'DDR4'],
        Slots: [2, 4]
    },
    power_supply: {
        Company: ['Gigabyte', "EVGA"],
        Wattage: ['550W', '750W', '850W'],
        Efficiency: ['Bronze', 'Gold', 'Platinum'],
        Modular: ['Full Modular', 'Non-modular'],
    },
    cabinet: {
        Company: ['NZXT', 'Montech', 'Lian Li', 'Phanteks'],
        Type: ['ATX Mid Tower', 'MicroATX Mid Tower'],
        Color: ['Black', 'White'],
        "Internal 35 Bays": ['1', '2'],
        "External Volume": ['36.1', '67.8', '51.8']
    },
    cooler: {
        Company: ['Thermalright', 'Deepcool', 'NZXT', 'Lian Li'],
        Size: ['120 mm', '240 mm', '360 mm'],
        Color: ['Black', 'White'],
        RPM: ['1550', '1800', '2000', '2100']
    },
};