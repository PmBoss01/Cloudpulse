"use client";

import { motion } from "motion/react";
import { TbBrandGithub, TbBrandSlack } from "react-icons/tb";

import { AwsLogo, AzureLogo, GoogleCloudLogo } from "@/components/shared/provider-icons";

const logos = [
  { name: "AWS", icon: AwsLogo },
  { name: "Azure", icon: AzureLogo },
  { name: "Google Cloud", icon: GoogleCloudLogo },
  { name: "GitHub", icon: TbBrandGithub },
  { name: "Slack", icon: TbBrandSlack },
];

export function TrustedByStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.1 }}
      className="mt-3 flex flex-col gap-1.5"
    >
      <span className="text-[11px] text-zinc-500 dark:text-zinc-500">
        Trusted by DevOps teams building a better cloud
      </span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {logos.map(({ name, icon: Icon }) => (
          <span
            key={name}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            <Icon className="size-3.5" />
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
