import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon,
  ...props 
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial"
  };
  
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#111',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid var(--glass)',
      boxShadow: 'none'
    }
  };
  
  const sizes = {
    small: {
      padding: '7px 10px',
      fontSize: '0.92rem'
    },
    medium: {
      padding: '9px 12px',
      fontSize: '1rem'
    }
  };
  
  return (
    <motion.button
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size]
      }}
      whileHover={{ 
        y: -3,
        filter: 'brightness(0.98)'
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;