'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UpsertDoctorForm from './upsert-doctor-form';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
export default function AddDoctorsButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Médico
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm />
    </Dialog>
  );
}
