import { ASSETS } from "@/lib/assets";

export function getPetState(streak: number) {
    if (streak === 0) {
        return {asset: ASSETS.sleepingCat};
    }
    if (streak < 5) {
        return {asset: ASSETS.awakeCat};
    }
    if (streak >= 5) {
        return {asset: ASSETS.superCat}; 
    }
    return {asset: ASSETS.awakeCat};   
}

