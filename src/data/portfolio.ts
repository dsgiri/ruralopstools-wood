export interface PortfolioLink {
  name: string;
  url: string;
  description: string;
}

export interface PortfolioCategory {
  title: string;
  links: PortfolioLink[];
}

export const PORTFOLIO_DATA: PortfolioCategory[] = [
  {
    title: "Core Platform & Planning",
    links: [
      { name: "Rural Utility Cost", url: "https://ruralutilitycost.com", description: "Master hub for rural, agricultural, and utility estimation tools." },
      { name: "Plan Hub", url: "https://plan.ruralutilitycost.com", description: "Long-term operational and resource planning schedules." },
      { name: "Solve Engine", url: "https://solve.ruralutilitycost.com", description: "General problem-solving and utility computation engine." },
      { name: "BreakTime", url: "https://breaktime.ruralutilitycost.com", description: "Labor management and operational downtime tracking." },
      { name: "Wood Hub", url: "https://wood.ruralutilitycost.com", description: "Lumber, timber, and woodworking estimation hub." }
    ]
  },
  {
    title: "Forecasting & Scenario Tools",
    links: [
      { name: "Forecast Hub", url: "https://forecast.ruralutilitycost.com", description: "Predictive models for rural utility economics." },
      { name: "Predictor", url: "https://predictor.ruralutilitycost.com", description: "Data-driven outcome estimation for agricultural metrics." },
      { name: "WhatIf Models", url: "https://whatif.ruralutilitycost.com", description: "Scenario planning and risk modeling for rural operations." },
      { name: "Price Tracking", url: "https://price.ruralutilitycost.com", description: "Commodity pricing integrations and local market rates." },
      { name: "Weather Station", url: "https://weather.ruralutilitycost.com", description: "Agro-meteorology and climate impact modeling." }
    ]
  },
  {
    title: "Agriculture & Agronomy",
    links: [
      { name: "Soil Management", url: "https://soil.ruralutilitycost.com", description: "Soil health, fertility, and amendment calculators." },
      { name: "Pest Control", url: "https://pest.ruralutilitycost.com", description: "Integrated pest management and application rates." },
      { name: "Carbon Tracking", url: "https://carbon.ruralutilitycost.com", description: "Carbon sequestration tracking and footprint estimation." },
      { name: "Grid & Spatial", url: "https://grid.ruralutilitycost.com", description: "Farm mapping, spatial layout, and land parcel gridding." },
      { name: "USDA Compliance", url: "https://usda.ruralutilitycost.com", description: "Compliance reporting tools matching USDA standards." },
      { name: "Quality Assurance", url: "https://quality.ruralutilitycost.com", description: "Produce and material QA/QC logging and compliance." }
    ]
  },
  {
    title: "Livestock & Animal Systems",
    links: [
      { name: "Livestock Management", url: "https://livestock.ruralutilitycost.com", description: "Herd management and livestock inventory tracking." },
      { name: "Beef Operations", url: "https://beef.ruralutilitycost.com", description: "Specialized beef cattle operational estimators." },
      { name: "Dairy Systems", url: "https://dairy.ruralutilitycost.com", description: "Dairy production facility tracking and yield projection." },
      { name: "Feed Logistics", url: "https://feed.ruralutilitycost.com", description: "Livestock feed tracking, consumption rates, and storage." },
      { name: "Aqua Culture", url: "https://aqua.ruralutilitycost.com", description: "Aquaculture water quality and system sizing tools." }
    ]
  },
  {
    title: "Infrastructure, Logistics & Operations",
    links: [
      { name: "Land Use", url: "https://land.ruralutilitycost.com", description: "Land use, zoning, and excavation volume estimations." },
      { name: "Storage Planning", url: "https://storage.ruralutilitycost.com", description: "Grain bin, silage, and cold storage capacity models." },
      { name: "Transport & Logistics", url: "https://transport.ruralutilitycost.com", description: "Hauling, freight, and agricultural transit logistics." }
    ]
  },
  {
    title: "Specialty & Utility Hubs",
    links: [
      { name: "Habitat Restoration", url: "https://habitat.ruralutilitycost.com", description: "Ecological and wildlife habitat planning tools." },
      { name: "Hydroponic Systems", url: "https://hydroponic.ruralutilitycost.com", description: "Nutrient schedules and indoor growing parameters." },
      { name: "Greenhouse Operations", url: "https://greenhouse.ruralutilitycost.com", description: "Climate-controlled agriculture heating and cooling costs." }
    ]
  }
];
