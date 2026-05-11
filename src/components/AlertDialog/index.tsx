import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

type ModelDialogDemoProps = {
  children: ReactNode;
  title: ModelDialogDemoProps['children'];
  description: ModelDialogDemoProps['children'];
  onConfirm: () => void;
  // onCancel?: ModelDialogDemoProps['onConfirm'];
};
export function ModelDialog({ children, title, description, onConfirm }: ModelDialogDemoProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button className="flex justify-between gap-1" variant="default">
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary" size="lg">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" size="lg" onClick={() => onConfirm()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
