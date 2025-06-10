export function formatFunFactLabel(key: string): string {
  switch (key) {
    case "evChargeCost":     return "Ladda elbil (60 kWh full laddning)";
    case "heatPumpDayCost":  return "Värmepump (24 h)";
    case "showerCost":       return "Dusch (10 min)";
    case "washerCost":       return "Tvättmaskin (1 cykel)";
    case "dryerCost":        return "Torktumlare (1 cykel)";
    case "dishwasherCost":   return "Diskmaskin (1 cykel)";
    default:                 return key;
  }
}