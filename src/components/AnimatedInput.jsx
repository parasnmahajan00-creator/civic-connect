import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedInput = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  textarea = false,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const isFloating = isFocused || (value && value.length > 0);
  
  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <motion.label
        htmlFor={id}
        style={{
          position: 'absolute',
          left: '12px',
          color: 'var(--muted)',
          pointerEvents: 'none',
          fontSize: '0.9rem'
        }}
        animate={{
          top: isFloating ? '8px' : '18px',
          fontSize: isFloating ? '0.75rem' : '0.9rem',
          color: isFloating ? 'var(--accent)' : 'var(--muted)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </motion.label>
      
      {textarea ? (
        <motion.textarea
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            padding: '24px 12px 12px',
            borderRadius: '10px',
            border: '1px solid var(--glass)',
            background: 'transparent',
            color: 'var(--text)',
            fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial",
            resize: 'vertical',
            minHeight: '120px'
          }}
          whileFocus={{ 
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 3px rgba(255, 215, 0, 0.2)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          {...props}
        />
      ) : (
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            padding: '24px 12px 12px',
            borderRadius: '10px',
            border: '1px solid var(--glass)',
            background: 'transparent',
            color: 'var(--text)',
            fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial",
            fontSize: '1rem'
          }}
          whileFocus={{ 
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 3px rgba(255, 215, 0, 0.2)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          {...props}
        />
      )}
    </div>
  );
};

export default AnimatedInput;