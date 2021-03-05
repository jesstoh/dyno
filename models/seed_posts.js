// Create seeds for post
const seedPosts = [
    {
        tags: ["v2", "drop knee"],
        img:
            "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2018/02/rock-climbing.png",
        description: "awesome climbing photo",
        location: "Gym Movement",
        author: "jess",
    },
    {
        tags: ["send", " v9", " outdoor"],
        img:
            "https://cdn.shopify.com/s/files/1/1554/2851/articles/winter-bouldering-header_ab1c5c73-15c2-43ef-905b-c804f37bed29_1400x.jpg?v=1576763959",
        description:
            "Outdoor bouldering, managed to nail this v9 route after multiple falls.",
        location: "",
        author: "loveboulder",
    },
    {
        tags: ["v2", "heel hook"],
        img:
            "https://images.pexels.com/photos/5384641/pexels-photo-5384641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        description:
            "Overhanging on this new wall, feel good of defying gravity",
        location: "Gym Movement",
        author: "spider",
    },
    {
        tags: ["v4", "betaHelp", "news"],
        author: "spider",
        description:
            "Attempt 15 times, still couldn't get the next move. Anyone has tried it, please leave some comment. Thanks!",
        img:
            "https://www.walltopia.com/images/projects/boulderplus/42580221_300701643858582_2333244153237864448_o.jpg",
        location: "boulder+",
    },
    {
        tags: ["news"],
        author: "wallhopper",
        description:
            "Trying out this gym in my neighborhood, cool and cozy place ",
        img:
            "http://static1.squarespace.com/static/5be4f2c0f793929686b0a305/t/5c49421abba223630db454e2/1548304967661/Climbfit_kirrawee_bouldering_wall_walltopia.jpg?format=1500w",
        location: "Climb Fit",
    },
    {
        tags: ["betaHelp"],
        author: "coolclimber",
        description: "Anyone tried these routes, red route is fun",
        img:
            "https://images.pexels.com/photos/6700272/pexels-photo-6700272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        location: "boulder world",

    },
    {
        tags: ["outdoor"],
        author: "loveboulder",
        description:
            "When you have tons of people supporting you instead of crash mat",
        img:
            "https://images.unsplash.com/photo-1593132517397-ceb31d77194a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
    {
        tags: ["outdoor"],
        author: "jess",
        description: "Largest bouldering in Singapore",
        img:
            "https://images.unsplash.com/photo-1583619695914-65d61e89556c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        location: "",

    },
    {
        tags: ["news"],
        author: "longroad",
        description: "Lots of strength to hand on the wall",
        img:
            "https://image.freepik.com/free-photo/young-attractive-female-rock-climber-climbing-challenging-route-steep-rock-wall_10069-1609.jpg",
    },
    {
        tags: ["outdoor"],
        author: "backpacker",
        description:
            "good training session outdoor, you guys should try it sometime, beautiful place",
        img:
            "https://images.unsplash.com/photo-1549048267-b6765b7cbfe2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvdWxkZXJpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        tags: ["ifsc"],
        author: "littleclimber",
        description: "Look who wins the IFSC championship this year",
        img:
            "https://www.insidethegames.biz/media/image/153105/o/MdfHOouU4a9pSdp0",
    },
    {
        tags: ["ifsc"],
        author: "best",
        description: "Crazy move at IFSC championship",
        img:
            "https://www.insidethegames.biz/media/image/153106/o/FL6pfvItl93WkYRs",
    },
    {
        tags: ["news"],
        author: "wallhopper",
        description:
            "Trying out this gym in my neighborhood, cool and cozy place ",
        img:
            "http://static1.squarespace.com/static/5be4f2c0f793929686b0a305/t/5c49421abba223630db454e2/1548304967661/Climbfit_kirrawee_bouldering_wall_walltopia.jpg?format=1500w",
        location: "Climb Fit",
    },
    {
        tags: ["outdoor"],
        author: "loveboulder",
        description:
            "When you have tons of people supporting you instead of crash mat",
        img:
            "https://images.unsplash.com/photo-1593132517397-ceb31d77194a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
    {
        tags: ["betaHelp"],
        author: "coolclimber",
        description: "Anyone tried these routes, red route is fun",
        img:
            "https://images.pexels.com/photos/6700272/pexels-photo-6700272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        location: "boulder world",

    },
    {
        tags: ["news"],
        author: "longroad",
        description: "Lots of strength to hand on the wall",
        img:
            "https://image.freepik.com/free-photo/young-attractive-female-rock-climber-climbing-challenging-route-steep-rock-wall_10069-1609.jpg",
    },
    {
        tags: ["ifsc"],
        author: "best",
        description: "Crazy move at IFSC championship",
        img:
            "https://www.insidethegames.biz/media/image/153106/o/FL6pfvItl93WkYRs",
    },
    {
        tags: ["news"],
        author: "jess",
        description: "Largest bouldering in Singapore👍",
        img:
            "https://images.pexels.com/photos/6700628/pexels-photo-6700628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        location: "Boulder World",
   
    },
    {
        tags: ["outdoor"],
        author: "backpacker",
        description:
            "good training session outdoor, you guys should try it sometime, beautiful place",
        img:
            "https://images.unsplash.com/photo-1549048267-b6765b7cbfe2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvdWxkZXJpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        tags: ["footwork"],
        author: "spider",
        description: "Nice footwork is everything",
        img:
            "https://images.pexels.com/photos/5383740/pexels-photo-5383740.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        location: "Climb Fit",
      
    },
    {
        tags: ["news"],
        author: "wallhopper",
        description:
            "Trying out this gym in my neighborhood, cool and cozy place ",
        img:
            "http://static1.squarespace.com/static/5be4f2c0f793929686b0a305/t/5c49421abba223630db454e2/1548304967661/Climbfit_kirrawee_bouldering_wall_walltopia.jpg?format=1500w",
        location: "Climb Fit",
    },
    {
        tags: ["betaHelp"],
        author: "coolclimber",
        description: "Anyone tried these routes, red route is fun",
        img:
            "https://images.unsplash.com/photo-1570030689007-6a0eb1991300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        location: "boulder world",
        
    },
    {
        tags: ["outdoor"],
        author: "loveboulder",
        description:
            "When you have tons of people supporting you instead of crash mat",
        img:
            "https://images.unsplash.com/photo-1593132517397-ceb31d77194a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    },
    {
        tags: ["news"],
        author: "jess",
        description: "Largest bouldering in Singapore",
        img:
            "https://www.groundupsg.com/wp-content/uploads/46421188925_8c104bdca3_k.jpg",
        location: "Boulder World",
       
    },
    {
        tags: ["news"],
        author: "longroad",
        description: "Lots of strength to hand on the wall",
        img:
            "https://image.freepik.com/free-photo/young-attractive-female-rock-climber-climbing-challenging-route-steep-rock-wall_10069-1609.jpg",
    },
    {
        tags: ["ifsc"],
        author: "best",
        description: "Crazy move at IFSC championship",
        img:
            "https://www.insidethegames.biz/media/image/153106/o/FL6pfvItl93WkYRs",
    },
    {
        tags: ["outdoor"],
        author: "backpacker",
        description:
            "good training session outdoor, you guys should try it sometime, beautiful place",
        img:
            "https://images.unsplash.com/photo-1549048267-b6765b7cbfe2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvdWxkZXJpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
        tags: ["overhang"],
        img:
            "https://dollarsandsense.sg/wp-content/uploads/2020/01/rahadiansyah-i3yTN_j3lDw-unsplash.jpg",
      
        description:
            "Overhanging on this new wall, feel good of defying gravity",
        location: "Vertigo",
        author: "jess",
    },
    {
        tags: ["outdoor"],
        img:
            "https://images.unsplash.com/photo-1522362485439-83fcff4673f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      
        description:
            "Outdoor bouldering session with besties, nice weather fruitful trip",
        location: "",
        author: "spider",
    },
    {
        tags: ["outdoor", "overhang"],
        description: "outdoor climbing session with friends 😀",
        location: "",
        author: "jess",
        img:
            "http://res.cloudinary.com/dufcxaocn/image/upload/v1614871108/cdbe8f07uiuokqeqdnlr.jpg",
    },
    {
        tags: ["v3", "video"],
        description:
            "Good route to practice heel hooks, starting point takes some time to figure out",
        location: "Onsight Climbing",
        author: "jess",
        video:
            "http://res.cloudinary.com/dufcxaocn/video/upload/v1614903539/o9ci5ejwpgoxy2seylr2.mp4",
    },
    {
        tags: ["outdoor"],
        description: "Nice spot to do overhang ",
        location: "",
        author: "littleclimber",
        img:
            "http://res.cloudinary.com/dufcxaocn/image/upload/v1614912981/yrqdxb8mpnckc4yrr65o.jpg",
    },
    {
        tags: ["outdoor"],
        description:
            "Great climbing session last Sat, near fall through crash mat 😬",
        location: "Boulder Park",
        author: "littleclimber",
        img:
            "http://res.cloudinary.com/dufcxaocn/image/upload/v1614927730/gnyit75ylhzvc4olmpxe.jpg",
    },
    {
        tags: ["outdoor"],
        description: "What a move!",
        location: "Boulder Park",
        author: "best",
        img:
            "https://images.unsplash.com/photo-1583602235428-7772ce14a541?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
];

module.exports = seedPosts;
