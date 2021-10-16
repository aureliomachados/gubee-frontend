import { Stack } from "./stack";
import { TargetMarket } from "./targetmarket";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stacks: Array<Stack>
    targetMarkets: Array<TargetMarket>
}
