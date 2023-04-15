import { useState } from 'react'
import { Dialog } from '@headlessui/react'

type ModalProps = {
  isOpen: boolean;
  setIsOpen: () => void;
}
export function Modal({ isOpen, setIsOpen }: ModalProps) {  
  return(
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>Complete your order</Dialog.Title>

          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}


