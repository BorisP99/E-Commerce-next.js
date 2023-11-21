import { Button } from "@/components/ui/button";

import { CheckCheck } from "lucide-react";
import Link from "next/link";

const stripeSuccess = () => {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="w-16 h-16 mx-auto my-6 text-green-600" />
        <div className="text-center">
          <h3 className="text-base md:text-2xl text-gray-900 font-semibold">
            Payment done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for your purchase! We hope you enjoy it!
          </p>
          <Button className="mt-4">
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default stripeSuccess;
