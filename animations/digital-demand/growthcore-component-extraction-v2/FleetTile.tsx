'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Battery, Package, X } from 'lucide-react';

// Mock data for the fleet
const mockVehicles = [
  { id: 'V01', status: 'On Time', battery: 82, pathId: 'path1', position: [20, 30] },
  { id: 'V02', status: 'Delayed', battery: 45, pathId: 'path2', position: [50, 60] },
  { id: 'V03', status: 'In Transit', battery: 95, pathId: 'path3', position: [80, 40] },
];

type Vehicle = (typeof mockVehicles)[0];

// Main Component
export default function FleetTile() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full aspect-square max-w-[600px] bg-slate-950 rounded-3xl border border-white/10 p-6 flex flex-col font-sans relative overflow-hidden shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-transparent z-0" />

      {/* Header */}
      <motion.header
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Truck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Fleet Overview</h2>
            <p className="text-xs text-slate-400">Real-Time Logistics</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror' as const }}
          />
          Live
        </div>
      </motion.header>

      {/* Main Content - Map and Vehicles */}
      <div className="flex-1 my-4 relative z-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 opacity-10">
          <path d="M10 80 Q 50 90, 90 20" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
          <path d="M20 10 Q 30 50, 50 50 T 90 80" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
          <path d="M80 90 C 50 70, 60 30, 20 20" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
        </svg>

        {mockVehicles.map((vehicle, index) => (
          <motion.button
            key={vehicle.id}
            className="absolute"
            style={{
              left: `${vehicle.position[0]}%`,
              top: `${vehicle.position[1]}%`,
            }}
            animate={{
              scale: selectedVehicle?.id === vehicle.id ? 1.5 : 1,
              y: [0, -5, 0],
            }}
            transition={{
              y: { duration: 2 + index, repeat: Infinity, repeatType: 'mirror' as const },
              scale: { duration: 0.3 },
            }}
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 ${
                selectedVehicle?.id === vehicle.id
                  ? 'border-white'
                  : vehicle.status === 'On Time'
                  ? 'border-emerald-500'
                  : vehicle.status === 'Delayed'
                  ? 'border-amber-500'
                  : 'border-blue-500'
              }`}
            >
              <div
                className={`w-full h-full rounded-full ${
                  vehicle.status === 'On Time'
                    ? 'bg-emerald-500'
                    : vehicle.status === 'Delayed'
                    ? 'bg-amber-500'
                    : 'bg-blue-500'
                } opacity-70`}
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Stats / Selected Vehicle Info */}
      <div className="h-28 z-10 relative">
        <AnimatePresence mode="wait">
          {!selectedVehicle ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-3 gap-4"
            >
              <div className="text-center flex flex-col justify-center">
                <p className="text-xs text-slate-400">On Time</p>
                <p className="text-3xl font-bold text-emerald-400">{mockVehicles.filter((v) => v.status === 'On Time').length}</p>
              </div>
              <div className="text-center flex flex-col justify-center">
                <p className="text-xs text-slate-400">In Transit</p>
                <p className="text-3xl font-bold text-blue-400">{mockVehicles.filter((v) => v.status === 'In Transit').length}</p>
              </div>
              <div className="text-center flex flex-col justify-center">
                <p className="text-xs text-slate-400">Delayed</p>
                <p className="text-3xl font-bold text-amber-400">{mockVehicles.filter((v) => v.status === 'Delayed').length}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full bg-slate-800 border border-white/10 rounded-xl p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-white">{selectedVehicle.id}</p>
                  <p
                    className={`text-xs font-bold ${
                      selectedVehicle.status === 'On Time'
                        ? 'text-emerald-400'
                        : selectedVehicle.status === 'Delayed'
                        ? 'text-amber-400'
                        : 'text-blue-400'
                    }`}
                  >
                    {selectedVehicle.status}
                  </p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex items-center gap-3">
                  <Battery className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Battery</p>
                    <p className="text-base font-bold text-white">{selectedVehicle.battery}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Cargo</p>
                    <p className="text-base font-bold text-white">Secure</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close vehicle details"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
