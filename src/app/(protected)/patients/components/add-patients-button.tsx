'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import UpsertPatientForm from './upsert-patient-form';

export default function AddPatientsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UpsertPatientForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
