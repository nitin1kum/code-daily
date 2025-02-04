import { BiGlobe, BiShield } from "react-icons/bi";
import { CiBoxes } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";


export const ENTERPRISE_FEATURES = [
  {
    icon: BiGlobe,
    label: "Global Infrastructure",
    desc: "Lightning-fast execution across worldwide edge nodes",
  },
  {
    icon: BiShield,
    label: "Enterprise Security",
    desc: "Bank-grade encryption and security protocols",
  },
  {
    icon: FiRefreshCcw,
    label: "Real-time Sync",
    desc: "Instant synchronization across all devices",
  },
  {
    icon: CiBoxes,
    label: "Unlimited Storage",
    desc: "Store unlimited snippets and projects",
  },
];

export const FEATURES = {
  development: [
    "Advanced AI",
    "Custom theme builder",
    "Integrated debugging tools",
    "Multi-language support",
  ],
  collaboration: [
    "Real-time pair programming",
    "Team workspaces",
    "Version control integration",
    "Code review tools",
  ],
  deployment: [
    "One-click deployment",
    "CI/CD integration",
    "Container support",
    "Custom domain mapping",
  ],
};


export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export type RazorpayExternalOption = {

  wallets: Array<string>;
  handler: (response: unknown) => void;
}

export type RazorpayPrefill = {

  email?: string;
  contact?: string;
  name?: string;
  method?: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
}

export type RazorpayError = {

  code: number;
  description: string;
}


