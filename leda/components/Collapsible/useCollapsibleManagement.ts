import React from 'react';

export function useCollapsibleManagement() {
  const [isOpen, setIsOpen] = React.useState(false);

  function openCollapsible() {
    setIsOpen(true);
  }
  function closeCollapsible() {
    setIsOpen(false);
  }
  return {
    isOpen,
    openCollapsible,
    closeCollapsible,
  };
}
