'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { doctorsTable } from '@/db/schema';
import { CalendarIcon, ClockIcon, DollarSign } from 'lucide-react';
import UpsertDoctorForm from './upsert-doctor-form';
import { Dialog } from '@radix-ui/react-dialog';
import { getAvailability } from '../helpers/availability';
import { formatCurrencyInCents } from '@/helpers/currency';

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const doctorInitials = doctor.name
    .split(' ')
    .map((name) => name[0])
    .join('');
  const availability = getAvailability(doctor);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-14 w-14">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-xs">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {availability.from.format('dddd')} a {availability.to.format('dddd')}
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          {availability.from.format('HH:mm')} as{' '}
          {availability.to.format('HH:mm')}
        </Badge>
        <Badge variant="outline">
          <DollarSign className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
