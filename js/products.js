const sourceProducts = [
    // === MEN'S COLLECTION ===
    { 
        id: 1, 
        name: "The Savile Row Wool Suit", 
        price: 850, 
        category: "men", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1266689_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1266689_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1266689_alternate1?$plpDeskRF$"
        ], 
        sizes: ["38R", "40R", "42R", "44R"], 
        colors: ["Navy"], 
        description: "Impeccably tailored two-piece suit crafted from pure worsted wool." 
    },
    { 
        id: 2, 
        name: "Cashmere Turtleneck Sweater", 
        price: 350, 
        category: "men", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710941439002_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710941439002_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710941439002_alternate1?$plpDeskRF$"
        ], 
        sizes: ["S", "M", "L", "XL"], 
        colors: ["Charcoal", "Camel"], 
        description: "Luxuriously soft 2-ply Scottish cashmere with ribbed trims." 
    },
    { 
        id: 3, 
        name: "Heritage Trench Coat", 
        price: 950, 
        category: "men", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785964031001_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785964031001_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785964031001_alternate1?$plpDeskRF$"
        ], 
        sizes: ["M", "L", "XL"], 
        colors: ["Beige"], 
        description: "Water-repellent cotton gabardine trench coat with traditional epaulets." 
    },
    {
        id: 16,
        name: "Oxford Button-Down Shirt",
        price: 125,
        category: "men",
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710660606191_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710660606191_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710660606191_alternate1?$plpDeskRF$"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Light Blue"],
        description: "Classic oxford cloth shirt with mother-of-pearl buttons."
    },

    // === WOMEN'S COLLECTION ===
    { 
        id: 4, 
        name: "Silk Blouse & Tailored Midi Skirt", 
        price: 1200, 
        category: "women", 
        images: [
            "assets/images/women-collection.jpg"
        ], 
        sizes: ["XS", "S", "M", "L"], 
        colors: ["Black"], 
        description: "A refined silk blouse paired with a sharply tailored midi skirt." 
    },
    { 
        id: 5, 
        name: "Pleated Midi Skirt", 
        price: 280, 
        category: "women", 
        images: [
            "assets/images/women-pleated-skirt.jpg"
        ], 
        sizes: ["XS", "S", "M", "L"], 
        colors: ["Navy", "Cream"], 
        description: "Elegant pleated midi skirt in flowing Italian wool blend." 
    },
    { 
        id: 6, 
        name: "Double-Breasted Blazer", 
        price: 650, 
        category: "women", 
        images: [
            "assets/images/women-blazer.jpg"
        ], 
        sizes: ["XS", "S", "M", "L"], 
        colors: ["Navy"], 
        description: "Structured wool-blend blazer adorned with crest-embossed gold buttons." 
    },
    {
        id: 17,
        name: "Cashmere Wrap Cardigan",
        price: 395,
        category: "women",
        images: [
            "assets/images/women-cardigan.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Cream"],
        description: "Luxuriously soft cashmere cardigan with self-tie belt."
    },

    // === KIDS' COLLECTION ===
    { 
        id: 7, 
        name: "Boys' Oxford Shirt", 
        price: 65, 
        category: "kids", 
        images: [
            "assets/images/kids-oxford-shirt.jpg"
        ], 
        sizes: ["4Y", "6Y", "8Y", "10Y"], 
        colors: ["Light Blue"], 
        description: "Classic cotton oxford shirt designed for comfort and style." 
    },
    { 
        id: 8, 
        name: "Girls' Party Dress", 
        price: 120, 
        category: "kids", 
        images: [
            "assets/images/kids-party-dress.jpg"
        ], 
        sizes: ["4Y", "6Y", "8Y", "10Y"], 
        colors: ["Red", "Navy"], 
        description: "Charming taffeta dress featuring a velvet sash." 
    },
    { 
        id: 9, 
        name: "Kids' Winter Parka", 
        price: 180, 
        category: "kids", 
        images: [
            "assets/images/kids-winter-parka.jpg"
        ], 
        sizes: ["6Y", "8Y", "10Y", "12Y"], 
        colors: ["Navy"], 
        description: "Water-resistant, down-filled parka to keep them warm all winter." 
    },

    // === SPORT COLLECTION ===
    { 
        id: 10, 
        name: "Performance Tech Jacket", 
        price: 220, 
        category: "sport", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A96670002_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A96670002_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A96670002_alternate1?$plpDeskRF$"
        ], 
        sizes: ["S", "M", "L", "XL"], 
        colors: ["Black"], 
        description: "Lightweight, moisture-wicking jacket designed for active movement." 
    },
    { 
        id: 11, 
        name: "Pro Tennis Shorts", 
        price: 85, 
        category: "sport", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710B14627001_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710B14627001_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710B14627001_alternate1?$plpDeskRF$"
        ], 
        sizes: ["S", "M", "L"], 
        colors: ["White"], 
        description: "Engineered stretch fabric with built-in mesh brief for optimal mobility." 
    },
    { 
        id: 12, 
        name: "Training Sweatshirt", 
        price: 110, 
        category: "sport", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785964030002_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785964030002_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785964030002_alternate1?$plpDeskRF$"
        ], 
        sizes: ["S", "M", "L", "XL"], 
        colors: ["Grey Heather"], 
        description: "Fleece-lined pullover offering exceptional warmth post-workout." 
    },

    // === ACCESSORIES COLLECTION ===
    { 
        id: 13, 
        name: "Classic Leather Briefcase", 
        price: 550, 
        category: "accessories", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A96831003_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A96831003_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A96831003_alternate4?$plpDeskRF$"
        ], 
        sizes: ["One Size"], 
        colors: ["Tan"], 
        description: "Full-grain leather briefcase featuring solid brass hardware." 
    },
    { 
        id: 14, 
        name: "Silk Twill Scarf", 
        price: 145, 
        category: "accessories", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A93287004_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A93287004_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI785A93287004_alternate1?$plpDeskRF$"
        ], 
        sizes: ["One Size"], 
        colors: ["Navy/Gold Multi"], 
        description: "Hand-rolled Italian silk scarf printed with our heritage motif." 
    },
    { 
        id: 15, 
        name: "Leather Oxford Shoes", 
        price: 495, 
        category: "accessories", 
        images: [
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710917050501_lifestyle?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710917050501_alternate10?$plpDeskRF$",
            "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710917050501_alternate1?$plpDeskRF$"
        ], 
        sizes: ["8", "9", "10", "11"], 
        colors: ["Black"], 
        description: "Goodyear-welted calfskin oxfords crafted in Northampton." 
    }
];

const products = sourceProducts.map((product) => {
    const imageOverrides = {
        4: "assets/images/women-collection.jpg",
        5: "assets/images/women-pleated-skirt.jpg",
        6: "assets/images/women-blazer.jpg",
        17: "assets/images/women-cardigan.jpg",
        7: "assets/images/kids-oxford-shirt.jpg",
        8: "assets/images/kids-party-dress.jpg",
        9: "assets/images/kids-winter-parka.jpg"
    };
    const sourceImages = product.images || (product.image ? [product.image] : []);
    const images = imageOverrides[product.id]
        ? [imageOverrides[product.id]]
        : sourceImages;

    return {
        ...product,
        images,
        image: images[0] || "assets/images/hero-fabric-composite.jpg",
        compareAtPrice: product.price,
        price: Math.max(1, Math.round(product.price / 2))
    };
});

window.products = products;
