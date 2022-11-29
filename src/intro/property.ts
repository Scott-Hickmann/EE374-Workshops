export class Property {
  name: string;
  location: string;
  value?: number;

  constructor(name: string, location: string, value?: number) {
    this.name = name;
    this.location = location;
    this.value = value;
  }

  adjustValueByPercent(percent: number) {
    if (this.value !== undefined) {
      this.value = this.value * (1 + percent / 100);
    }
  }

  description(): string {
    if (this.value !== undefined) {
      return `${this.name} is located at ${this.location} and valued at $${this.value}.`;
    } else {
      return `${this.name} is located at ${this.location} and has no valuation yet.`;
    }
  }

  objectForm(): PropertyInterface {
    if (this.value !== undefined) {
      return { name: this.name, location: this.location, value: this.value };
    } else {
      return { name: this.name, location: this.location };
    }
  }
}

export interface PropertyInterface {
  name: string;
  location: string;
  value?: number;
}
