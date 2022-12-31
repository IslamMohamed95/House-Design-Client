import React from "react";
import "../Footer/Footer.css";
import { motion } from "framer-motion";
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      all rights &copy; 2006 reserved for
      <span className="text-danger"> house design prefab company</span>
    </motion.footer>
  );
}

export default Footer;
