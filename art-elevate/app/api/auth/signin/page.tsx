import { AlertCircle, Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LoginButton } from '@/components/login-btn';

const SignInPage = ({
  searchParams,
}: {
  searchParams: { callBackUrl: string };
}) => {
  return (
    <div className="flex items-center">
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You should login to see this page.</AlertDescription>
      </Alert>
    </div>
  );
};

export default SignInPage;
