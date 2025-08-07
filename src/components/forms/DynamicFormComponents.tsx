import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, User, MapPin } from "lucide-react";

interface AboutMeComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function AboutMeComponent({ value, onChange }: AboutMeComponentProps) {
  return (
    <div className="space-y-2 animate-scale-in">
      <Label htmlFor="about-me" className="flex items-center gap-2 text-sm font-medium">
        <User className="h-4 w-4 text-primary" />
        About Me
      </Label>
      <Textarea
        id="about-me"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us a bit about yourself..."
        className="input-glass min-h-[120px] resize-none"
        rows={5}
      />
    </div>
  );
}

interface AddressComponentProps {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  onStreetChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onZipChange: (value: string) => void;
}

export function AddressComponent({
  streetAddress,
  city,
  state,
  zip,
  onStreetChange,
  onCityChange,
  onStateChange,
  onZipChange,
}: AddressComponentProps) {
  return (
    <div className="space-y-4 animate-scale-in">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <MapPin className="h-4 w-4 text-primary" />
        Address Information
      </Label>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="street" className="text-sm">Street Address</Label>
          <Input
            id="street"
            value={streetAddress}
            onChange={(e) => onStreetChange(e.target.value)}
            placeholder="123 Main Street"
            className="input-glass"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-sm">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              placeholder="New York"
              className="input-glass"
            />
          </div>
          
          <div>
            <Label htmlFor="state" className="text-sm">State</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => onStateChange(e.target.value)}
              placeholder="NY"
              className="input-glass"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="zip" className="text-sm">ZIP Code</Label>
          <Input
            id="zip"
            value={zip}
            onChange={(e) => onZipChange(e.target.value)}
            placeholder="10001"
            className="input-glass"
          />
        </div>
      </div>
    </div>
  );
}

interface BirthdateComponentProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function BirthdateComponent({ value, onChange }: BirthdateComponentProps) {
  return (
    <div className="space-y-2 animate-scale-in">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <CalendarIcon className="h-4 w-4 text-primary" />
        Date of Birth
      </Label>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal input-glass",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 glass-card border-white/20" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}