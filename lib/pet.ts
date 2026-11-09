import { ASSETS } from "@/lib/assets";

export function getPetState(streak: number) {
    if (streak === 0) {
        return {asset: ASSETS.sleepingCat};
    }
    return {asset: ASSETS.awakeCat};
}
