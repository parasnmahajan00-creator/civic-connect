import { motion } from 'framer-motion';

const AnimatedIssueCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        padding: '14px',
        borderRadius: '12px',
        border: '1px solid var(--glass)',
        background: 'var(--card)',
        marginBottom: '12px'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay,
        ease: 'easeOut'
      }}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedIssueCard;