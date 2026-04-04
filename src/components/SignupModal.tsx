import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignupModal({ open, onClose }: SignupModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Join today and get over</h2>
          <h2 className="text-2xl font-bold text-foreground">10% Cash Back.*</h2>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <Input placeholder="Email" type="email" className="h-12 rounded-lg" />
          <Input placeholder="Password (8+ characters)" type="password" className="h-12 rounded-lg" />
          <Button type="submit" className="w-full h-12 rounded-lg text-base font-semibold">
            Join Now
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Continue with Google", icon: "G" },
            { label: "Continue with Facebook", icon: "f" },
            { label: "Continue with Apple", icon: "" },
          ].map(provider => (
            <Button key={provider.label} variant="outline" className="w-full h-11 rounded-lg justify-center gap-2 font-medium">
              <span className="font-bold text-lg">{provider.icon}</span>
              {provider.label}
            </Button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/dashboard" className="text-primary font-semibold hover:underline" onClick={onClose}>
            Sign In
          </Link>
        </p>

        <p className="text-center text-primary text-sm font-medium mt-2 cursor-pointer hover:underline">
          Did someone refer you?
        </p>

        <p className="text-center text-xs text-muted-foreground mt-3">
          By joining, you agree to the <span className="underline cursor-pointer">Terms & Conditions</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </DialogContent>
    </Dialog>
  );
}