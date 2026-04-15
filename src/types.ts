import { LucideIcon } from "lucide-react";

export interface Professional {
  id: number;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  therapies: string[];
  about: string;
  price: string;
}

export interface Therapy {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface DateOption {
  day: string;
  date: string;
  active: boolean;
}

export interface Appointment {
  id: number;
  proId: number;
  date: string;
  time: string;
  status: string;
}

export type ViewType =
  | "splash"
  | "login"
  | "home"
  | "discover"
  | "appointments"
  | "view-appointment"
  | "cancellation-done"
  | "edit-profile"
  | "profile-saved"
  | "user-profile"
  | "ai-match"
  | "profile"
  | "book"
  | "success";
