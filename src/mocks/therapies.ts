import { Activity, Wind, Ear, Flame } from "lucide-react";
import { Therapy } from "../types";

const THERAPIES: Therapy[] = [
  { id: "acupuncture", name: "Acupuntura", icon: Activity },
  { id: "cupping", name: "Ventosaterapia", icon: Wind },
  { id: "auriculotherapy", name: "Auriculoterapia", icon: Ear },
  { id: "moxibustion", name: "Moxabustão", icon: Flame },
];

export default THERAPIES;
