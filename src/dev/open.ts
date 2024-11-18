import { OpenData } from '../typings'

export const mockOpenData: OpenData = {
	dev: false,
	name: 'Robert Colombo',
	myRole: 'owner',
	label: 'chef',
	stock: [
		{
			name: 'pallets',
			label: 'Pallets',
			amount: 54,
		},
		{
			name: 'pallets1',
			label: 'Pallets 1',
			amount: 542,
		},
		{
			name: 'pallets2',
			label: 'Pallets 2',
			amount: 543,
		},
		{
			name: 'pallets3',
			label: 'Pallets 3',
			amount: 544,
		}
	],
	purchases: [
		{
			price: 0,
			name: 'raw_meat_patty',
			label: 'Raw pork meat',
			max: 10,
			min: 0,
		},
		{
			price: 0,
			name: 'meat',
			label: 'Raw meat',
			max: 10,
			min: 0,
		},
		{
			price: 0,
			name: 'fish',
			label: 'Raw fish',
			max: 10,
			min: 0,
		},
	],
	products: [
		{
			price: 50,
			name: 'raw_vegan_pizza',
			label: 'Raw Vegan Pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'bellini',
			label: 'Bellini',
			min: 0,
		},
		{
			price: 50,
			name: 'calamaripasta',
			label: 'Calamari Pasta',
			min: 0,
		},
		{
			price: 50,
			name: 'pastaalfredo',
			label: 'Pasta Alfredo',
			min: 0,
		},
		{
			price: 50,
			name: 'chickenparmpasta',
			label: 'Chicken Parm Pasta',
			min: 0,
		},
		{
			price: 50,
			name: 'lemonade',
			label: 'Lemonade',
			min: 0,
		},
		{
			price: 30,
			name: 'vegan_pizza',
			label: 'Vegan Pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'raw_altf4_pizza',
			label: 'Raw ALTF4 Pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'raw_meat_pizza',
			label: 'Raw Meat Pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'pannacotta',
			label: 'Panna Cotta',
			min: 0,
		},
		{
			price: 50,
			name: 'wings',
			label: 'Wings',
			min: 0,
		},
		{
			price: 50,
			name: 'raw_fish_pizza',
			label: 'Raw Fish Pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'fish_pizza',
			label: 'Fish pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'gralik_bread',
			label: 'Garlic Bread',
			min: 0,
		},
		{
			price: 50,
			name: 'canolli',
			label: 'Canolli',
			min: 0,
		},
		{
			price: 50,
			name: 'hoagiesub',
			label: 'Hoagie Sub',
			min: 0,
		},
		{
			price: 50,
			name: 'raw_chicken_mushrooms_pizza',
			label: 'Raw Chicken & Mushrooms Pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'chicken_mushrooms_pizza',
			label: 'Chicken and mushroom pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'rose_wine',
			label: 'Rosé Wine',
			min: 0,
		},
		{
			price: 50,
			name: 'altf4_pizza',
			label: 'Pizza ALTF4',
			min: 0,
		},
		{
			price: 30,
			name: 'red_wine',
			label: 'Red Wine',
			min: 0,
		},
		{
			price: 50,
			name: 'raw_calzone_pizza',
			label: 'Raw Calzone',
			min: 0,
		},
		{
			price: 50,
			name: 'white_wine',
			label: 'White Wine',
			min: 0,
		},
		{
			price: 100,
			name: 'meat_pizza',
			label: 'Meat pizza',
			min: 0,
		},
		{
			price: 50,
			name: 'calzone_pizza',
			label: 'Calzone',
			min: 0,
		},
	],
	funds: 454759,
	roles: [
		{
			percentage: 1,
			outfits: {
				female: '123psc',
				male: '',
			},
			permissions: ['roles'],
			salary: 100,
			name: 'delivery',
			grade: 1,
			label: 'Driver',
		},
		{
			percentage: 0.8,
			outfits: {
				female: '123psc',
				male: '',
			},
			permissions: [],
			salary: 100,
			name: 'cook',
			grade: 2,
			label: 'Cook',
		},
		{
			percentage: 0.6,
			outfits: {
				female: '123psc',
				male: '',
			},
			permissions: [],
			salary: 100,
			name: 'chef',
			grade: 3,
			label: 'Chef',
		},
		{
			percentage: 0.7,
			outfits: {
				female: '123psc',
				male: '',
			},
			permissions: ['hire', 'clock-out', 'bonus', 'permissions', 'employees', 'roles'],
			salary: 100,
			name: 'manager',
			grade: 4,
			label: 'Manager',
		},
		{
			percentage: 0.2,
			outfits: {
				female: '123psc',
				male: '',
			},
			permissions: ['hire', 'clock-out', 'bonus', 'stash', 'roles', 'employees', 'outfits', 'funds', 'permissions', 'products', 'logs', 'reset'],
			salary: 100,
			name: 'owner',
			grade: 5,
			label: 'Owner',
		},
	],
	employees: [
		{
			role: 'manager',
			phone: '963910902',
			active: 1,
			iban: 'ALTF4612427',
			name: 'Liedan  Montana',
			citizenid: '123456789',
		},
		{
			role: 'owner',
			phone: '936999754',
			active: 1,
			iban: 'ALTF4651984',
			name: 'Katherine Jordan',
			citizenid: '123456789',
		},
		{
			role: 'owner',
			phone: '92727492',
			active: 1,
			iban: 'ALTF4232445',
			name: 'Kristaps Porzingis',
			citizenid: '123456789',
		},
		{
			role: 'manager',
			phone: '93989118',
			active: 2,
			iban: 'ALTF4856292',
			name: 'Grandpa Porzingis',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '913670606',
			active: 2,
			iban: 'ALTF4182346',
			name: 'Ace Gemini',
			citizenid: '123456789',
		},
		{
			role: 'manager',
			phone: '967238230',
			active: 2,
			iban: 'ALTF4185800',
			name: 'Colton Calhoun',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '967951024',
			active: 2,
			iban: 'ALTF4553093',
			name: 'Max  Frost',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '938980512',
			active: 0,
			iban: 'ALTF4596499',
			name: 'Marine Kojak',
			citizenid: '123456789',
		},
		{
			role: 'manager',
			phone: '921634501',
			active: 0,
			iban: 'ALTF4878103',
			name: 'Kylie Gemini',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '931343037',
			active: 0,
			iban: 'ALTF4591078',
			name: 'Mike Dudley',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '941549954',
			active: 0,
			iban: 'ALTF4588644',
			name: 'Bee Kurr',
			citizenid: '123456789',
		},
		{
			role: 'manager',
			phone: '926598276',
			active: 0,
			iban: 'ALTF4171931',
			name: 'Dylan Montana',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '923349627',
			active: 0,
			iban: 'ALTF4818714',
			name: 'Moose Moose',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '968500143',
			active: 0,
			iban: 'ALTF4362058',
			name: 'Desmond  Colt ',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '968486879',
			active: 0,
			iban: 'ALTF4873052',
			name: 'Lily Rose',
			citizenid: '123456789',
		},
		{
			role: 'manager',
			phone: '955208233',
			active: 0,
			iban: 'ALTF4666952',
			name: 'Bingus Porzigis',
			citizenid: '123456789',
		},
		{
			role: 'chef',
			phone: '961260627',
			active: 0,
			iban: 'ALTF4231607',
			name: 'Xiao Min',
			citizenid: '123456789',
		},
	],
    permissions: {
		default: [
			{
				name: 'hire',
				label: 'Hire',
				description: 'Allows the role to hire other players',
			},
			{
				name: 'clock-out',
				label: 'Clock Out',
				description: 'Allows the role to clock out other players',
			},
			{
				name: 'bonus',
				label: 'Pay Bonus',
				description: 'Allows the role to pay bonuses to other players',
			},
			{
				name: 'stash',
				label: 'Stash',
				description: 'Allows the role to access the business stash',
			},
			{
				name: 'roles',
				label: 'Roles',
				description: 'Allows the role to create/edit/delete other roles',
			},
			{
				name: 'employees',
				label: 'Employees',
				description: 'Allows the role to manage other players',
			},
			{
				name: 'outfits',
				label: 'Outfits',
				description: 'Allows the role to create/edit/delete outfits',
			},
			{
				name: 'funds',
				label: 'Funds',
				description: 'Allows the role to view the business funds',
			},
			{
				name : 'permissions',
				label : 'Permissions',
				description : 'Allows the role to edit permissions',
			},
			{
				name : 'products',
				label : 'Products',
				description : 'Allows the role to edit product prices',
			},
			{
				name : 'logs',
				label : 'Logs',
				description : 'Can see logs',
			}
    	],
		"job": [
            {
                "name": "driver_license",
                "label": "Driver License",
                "description": "Seize"
            },
            {
                "name": "weapon_license",
                "label": "Weapon License",
                "description": "Give / Revoke"
            }
        ],
        "vehicles": [
            {
                "label": "Ford CVPI",
                "name": "pd1"
            },
            {
                "label": "Taurus 2018",
                "name": "2018taurusrb"
            },
            {
                "label": "Chevrolet Tahoe",
                "name": "code321tahoe"
            },
            {
                "label": "Ford Explorer",
                "name": "BCSO2"
            },
            {
                "label": "Dodge Charger",
                "name": "18chargernf"
            },
            {
                "label": "Durango 2021",
                "name": "code321durango"
            },
            {
                "label": "Dodge RAM TRX",
                "name": "trxpd"
            },
            {
                "label": "Ford F-150",
                "name": "18f150k9rb"
            },
            {
                "label": "Dodge Charger Hellcat",
                "name": "hellcat"
            },
            {
                "label": "Audi RS6",
                "name": "21avantrb"
            },
            {
                "label": "BMW M5 2018",
                "name": "pd_bmwr"
            },
            {
                "label": "Chevrolet Camaro",
                "name": "21LTZ"
            },
            {
                "label": "Annis Elegy (SEU)",
                "name": "bcpd7"
            },
            {
                "label": "Dodge Challenger",
                "name": "poldemonrb"
            },
            {
                "label": "Dodge Charger (SEU)",
                "name": "rmodchargerp"
            },
            {
                "label": "Ford Mustang",
                "name": "mustpol"
            },
            {
                "label": "Chevrolet Corvette",
                "name": "zr1RB"
            },
            {
                "label": "Mercedes AMG GT-R",
                "name": "polamggtr"
            },
            {
                "label": "Riot",
                "name": "riot"
            },
            {
                "label": "Police Bus",
                "name": "pbus"
            },
            {
                "label": "Insurgent",
                "name": "policeinsurgent2"
            },
            {
                "label": "Buffalo Unmarked",
                "name": "fbi"
            },
            {
                "label": "Ubermacht Oracle",
                "name": "apoliceu9"
            },
            {
                "label": "Vapid Speedo",
                "name": "apoliceu13"
            },
            {
                "label": "Gallivanter Baller",
                "name": "apoliceub"
            },
            {
                "label": "Vapid Dominator",
                "name": "dvdt3"
            },
            {
                "label": "Nagasaki BF400 PD",
                "name": "bf400pd"
            },
            {
                "label": "Police bike",
                "name": "pbike"
            },
            {
                "label": "Police Motorbike",
                "name": "policebike"
            },
            {
                "label": "Harley",
                "name": "14bike"
            },
            {
                "label": "BMW GS1200R",
                "name": "npolmm"
            },
            {
                "label": "Kawasaki",
                "name": "mbu3rb"
            }
        ],
        "weapons": [
            {
                "name": "weapon_carbinerifle",
                "label": "Carbine Rifle"
            },
            {
                "name": "weapon_carbinerifle_mk2",
                "label": "Carbine Rifle MK2"
            },
            {
                "name": "weapon_specialcarbine",
                "label": "Special Carbine"
            },
            {
                "name": "weapon_specialcarbine_mk2",
                "label": "Special Carbine MK2"
            },
            {
                "name": "megaphone",
                "label": "Megaphone"
            },
            {
                "name": "weapon_mp7",
                "label": "MP7"
            },
            {
                "name": "weapon_m110",
                "label": "M110"
            },
            {
                "name": "stungrenade",
                "label": "Stun Grenade"
            },
            {
                "name": "weapon_hk417",
                "label": "HK 417"
            },
            {
                "name": "weapon_fn509",
                "label": "FN 509"
            },
            {
                "name": "weapon_mcxrattler",
                "label": "MCX Rattler"
            },
            {
                "name": "weapon_m4a1block2",
                "label": "M4A1"
            },
            {
                "name": "weapon_beanbag",
                "label": "Bean Bag"
            }
        ]
	}
}
