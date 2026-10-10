"use client";

import { motion } from "motion/react";
import { BarTable, BarTableRow, type BarRow } from "@/components/shared/attribution/bar-table";
import {
  DeviceComputerIcon, DeviceConsoleIcon, DevicePhoneIcon, DeviceTabletIcon, DeviceTvIcon, DeviceVrIcon, DeviceWatchIcon,
  FlagAuA, FlagAuB, FlagAuC, FlagBeLeft, FlagBeMid, FlagBeRight, FlagCaLeaf, FlagCircleBlue, FlagCircleWhite, FlagDeBottom, FlagDeMid, FlagDeTop,
  FlagNlBottom, FlagNlTop, FlagUkA, FlagUkB, FlagUsCanton, FlagUsStripes,
} from "@/components/icons/dm-links-icons";

/* Round 20px flags assembled from the Framer vector layers (absolute insets copied from the dump). */
const flags = {
  nl: (
    <>
      <FlagCircleWhite className="absolute inset-0" />
      <FlagNlTop className="absolute left-px right-px top-0 h-1.5" />
      <FlagNlBottom className="absolute bottom-0 left-px right-px h-[7px]" />
    </>
  ),
  be: (
    <>
      <FlagBeMid className="absolute bottom-0 left-[5px] top-0 w-[9px]" />
      <FlagBeRight className="absolute bottom-px right-0 top-0 w-[7px]" />
      <FlagBeLeft className="absolute bottom-px left-0 top-0 w-1.5" />
    </>
  ),
  de: (
    <>
      <FlagDeBottom className="absolute bottom-0 left-px right-px h-2" />
      <FlagDeTop className="absolute left-px right-px top-0 h-[7px]" />
      <FlagDeMid className="absolute left-0 right-0 top-1.5 h-[7px]" />
    </>
  ),
  ca: (
    <>
      <FlagCircleWhite className="absolute inset-0" />
      <FlagCaLeaf className="absolute bottom-px left-0 right-0 top-0" />
    </>
  ),
  us: (
    <>
      <FlagCircleWhite className="absolute inset-0" />
      <FlagUsStripes className="absolute bottom-0 left-0 right-0 top-0.5" />
      <FlagUsCanton className="absolute left-0 top-0 size-2.5" />
    </>
  ),
  uk: (
    <>
      <FlagCircleWhite className="absolute inset-0" />
      <FlagUkA className="absolute inset-0" />
      <FlagUkB className="absolute inset-0" />
    </>
  ),
  au: (
    <>
      <FlagCircleBlue className="absolute inset-0" />
      <FlagAuA className="absolute left-0 top-0 size-2.5" />
      <FlagAuB className="absolute left-px top-px size-[9px]" />
      <FlagAuC className="absolute left-1 top-1 h-3 w-[15px]" />
    </>
  ),
};

const COUNTRIES: BarRow[] = [
  { icon: flags.nl, label: "Netherlands", value: "2,000", gray: 156 / 412, green: 156 / 412 },
  { icon: flags.be, label: "Belgium", value: "1,640", gray: 132 / 412, green: 74 / 412 },
  { icon: flags.de, label: "Germany", value: "800", gray: 94 / 412, green: 41 / 412 },
  { icon: flags.ca, label: "Canada", value: "720", gray: 68 / 412, green: 17 / 412 },
  { icon: flags.us, label: "United States", value: "500", gray: 42 / 412, green: 24 / 412 },
  { icon: flags.uk, label: "United Kingdom", value: "248", gray: 12 / 412 },
  { icon: flags.au, label: "Australia", value: "164", gray: 1 / 412 },
];

const DEVICES: BarRow[] = [
  { icon: <DeviceComputerIcon className="absolute inset-px" />, label: "Desktop", value: "2,200", gray: 204 / 412, green: 204 / 412 },
  { icon: <DevicePhoneIcon className="absolute bottom-px left-[3px] right-1 top-px" />, label: "Mobile", value: "1,400", gray: 92 / 412, green: 60 / 412 },
  { icon: <DeviceTabletIcon className="absolute inset-x-0.5 inset-y-px" />, label: "Tablet", value: "460", gray: 33 / 412, green: 32 / 412 },
  { icon: <DeviceTvIcon className="absolute inset-px" />, label: "Smart TV", value: "92", gray: 71 / 412 },
  { icon: <DeviceConsoleIcon className="absolute bottom-px left-px right-0.5 top-px" />, label: "Console", value: "48", gray: 48 / 412 },
  { icon: <DeviceWatchIcon className="absolute inset-x-1 inset-y-px" />, label: "Watch", value: "20", gray: 25 / 412 },
  { icon: <DeviceVrIcon className="absolute bottom-1 left-px right-px top-[3px]" />, label: "VR", value: "8", gray: 18 / 412 },
];

/**
 * "Countries" clicks table (Framer "D1-1", 432x343). The devices list sits on top of it and fades
 * in/out on a ~3s loop (0.6s fade, ~1s hold), exactly like the Framer component cycle.
 */
export function GeoDevicesMockup() {
  return (
    <BarTable title="Countries" meta="Clicks" rows={COUNTRIES} className="max-w-[432px]" contentClassName="gap-0 justify-center">
      <motion.div
        aria-hidden
        className="absolute inset-2.5 z-[1] flex flex-col gap-1 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0, 0] }}
        transition={{ duration: 3.07, times: [0, 0.2, 0.5, 0.7, 1], repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        {DEVICES.map((row) => (
          <BarTableRow key={row.label} row={row} />
        ))}
      </motion.div>
    </BarTable>
  );
}
