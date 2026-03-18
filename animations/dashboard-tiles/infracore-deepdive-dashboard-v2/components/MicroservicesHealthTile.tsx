import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Server, 
  Database, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Layers, 
  Clock 
} from 'lucide-react';

// --- Constants & Types ---
type ServiceStatus = 'healthy' | 'warning' | 'critical' | 'inactive';

interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  icon?: React.ReactNode;
}

const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Auth-Srv', status: 'healthy', icon: <ShieldCheck size={14} /> },
  { id: '2', name: 'API-Gtw', status: 'healthy', icon: <Globe size={14} /> },
  { id: '3', name: 'Pay-Gtw', status: 'warning', icon: <Activity size={14} /> },
  { id: '4', name: 'Log-Srv', status: 'healthy', icon: <Layers size={14} /> },
  { id: '5', name: 'Search', status: 'healthy', icon: <Server size={14} /> },
  { id: '6', name: 'Img-Proc', status: 'critical', icon: <AlertCircle size={14} /> },
  { id: '7', name: 'Email', status: 'healthy', icon: <Mail size={14} /> },
  { id: '8', name: 'Queue', status: 'healthy', icon: <Clock size={14} /> },
  { id: '9', name: 'Legacy', status: 'inactive', icon: <Database size={14} /> },
  { id: '10', name: 'Metrics', status: 'healthy', icon: <Activity size={14} /> },
  { id: '11', name: 'KV-Store', status: 'healthy', icon: <Database size={14} /> },
  { id: '12', name: 'Crawler', status: 'healthy', icon: <Globe size={14} /> },
];

// --- Sub-components ---

const StatusIndicator = ({ status }: { status: ServiceStatus }) => {
  const getColors = () => {
    switch (status) {
      case 'healthy': return 'bg-[#10b981]';
      case 'warning': return 'bg-[#8c25f4]'; // Using primary purple for warning/activity
      case 'critical': return 'bg-[#ef4444]';
      case 'inactive': return 'bg-white/20';
      default: return 'bg-white/20';
    }
  };

  const getAnimation = () => {
    switch (status) {
      case 'healthy': return { opacity: [0.5, 1, 0.5] }; // Gentle breathe
      case 'warning': return { scale: [1, 1.2, 1] }; // Ping
      case 'critical': return { opacity: [1, 0.3, 1] }; // Fast flash
      default: return {};
    }
  };

  const getTransition = () => {
    switch (status) {
      case 'healthy': return { duration: 3, repeat: Infinity, ease: "easeInOut" as const };
      case 'warning': return { duration: 0.5, repeat: Infinity, repeatType: "mirror" as const };
      case 'critical': return { duration: 0.2, repeat: Infinity };
      default: return {};
    }
  };

  return (
    <motion.div
      className={`size-2 rounded-full ${getColors()}`}
      animate={getAnimation()}
      transition={getTransition()}
    />
  );
};

export default function MicroservicesHealthTile() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) => 
        prev.map((service) => {
          // 5% chance to change status
          if (Math.random() > 0.95) {
            const statuses: ServiceStatus[] = ['healthy', 'healthy', 'healthy', 'warning', 'critical'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            // Don't change inactive ones
            if (service.status === 'inactive') return service;
            return { ...service, status: newStatus };
          }
          return service;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'healthy': return 'bg-[#10b981]/20 border-[#10b981]/30';
      case 'warning': return 'bg-[#8c25f4]/20 border-[#8c25f4]/30 neon-glow-primary';
      case 'critical': return 'bg-[#ef4444]/20 border-[#ef4444]/30';
      case 'inactive': return 'bg-white/5 border-white/10';
      default: return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 h-full flex flex-col w-full relative overflow-hidden group">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-bold">Microservices Health</h3>
        <motion.span 
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded uppercase"
        >
          System Grid Active
        </motion.span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 flex-1 content-start">
        {services.map((service) => (
          <motion.div
            key={service.id}
            layout
            className="flex flex-col items-center gap-2 group/item cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`size-10 rounded-lg flex items-center justify-center relative transition-colors duration-500 ${getStatusColor(service.status)}`}>
              <StatusIndicator status={service.status} />
              
              {/* Critical Badge */}
              <AnimatePresence>
                {service.status === 'critical' && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#ef4444] text-[8px] text-white font-bold"
                  >
                    !
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[9px] text-white/40 font-bold uppercase truncate w-full text-center group-hover/item:text-white transition-colors">
              {service.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Decorative background pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#8c25f4]/0 via-[#8c25f4]/5 to-[#8c25f4]/0 blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}