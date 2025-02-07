import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import React from "react";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { BiStar } from "react-icons/bi";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import UpgradeButton from "./_components/UpgradeButton";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20">
      <NavigationHeader />

      {/* Main Content */}
      <main className="relative pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-24">
            <div className="relative inline-block">
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-10" />
              <h1
                className="relative text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r
               from-gray-100 to-gray-300 text-transparent bg-clip-text mb-8"
              >
                Elevate Your <br />
                Development Experience
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Join the next generation of developers with our professional suite
              of tools
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative bg-gradient-to-b from-[#12121a] to-[#0a0a0f] rounded-2xl p-3 sm:p-6 hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  <div
                    className="sm:w-12 w-8 h-8 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                  flex items-center justify-center mb-4 ring-1 ring-gray-800/60 group-hover:ring-blue-500/20"
                  >
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}

          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute -inset-px bg-gradient-to-r from-blue-500
             to-purple-500 rounded-2xl blur opacity-10"
            />
            <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl">
              <div
                className="absolute inset-x-0 -top-px h-px bg-gradient-to-r 
              from-transparent via-blue-500/50 to-transparent"
              />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="relative p-4 sm:p-8 md:p-12">
                {/* header */}
                <div className="text-center mb-12">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-800/60 mb-6">
                    <BiStar className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-semibold text-white mb-4">
                    Lifetime Pro Access
                  </h2>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-2xl text-gray-400">$</span>
                    <span className="text-6xl font-semibold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
                      39
                    </span>
                    <span className="text-xl text-gray-400">one-time</span>
                  </div>
                  <p className="text-gray-400 text-lg">
                    Unlock the full potential of CodeDaily
                  </p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Deployment">
                    {FEATURES.deployment.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <SignedIn>
                    <UpgradeButton />
                  </SignedIn>

                  <SignedOut>
                    <SignInButton>
                      <div className="bg-blue-600 group rounded-md py-2.5 px-3 hover:scale-105 transition- duration-150 cursor-pointer hover:bg-blue-700">
                        <span className="text-sm font-white/80 group-hover:text-white transition-colors">
                          Sign In / Sign Up
                        </span>
                      </div>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PricingPage;
