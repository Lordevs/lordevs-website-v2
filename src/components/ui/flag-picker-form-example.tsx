import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "@/components/ui/flag";
import { type FlagCode, FlagPicker } from "@/components/ui/flag-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  country: FlagCode;
}

export default function UserProfileForm() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    name: "",
    email: "",
    country: "US",
  });

  const [users, setUsers] = useState<UserProfile[]>([
    { id: "1", name: "John Doe", email: "john@example.com", country: "US" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", country: "GB" },
    { id: "3", name: "Hans Mueller", email: "hans@example.com", country: "DE" },
    {
      id: "4",
      name: "Marie Dubois",
      email: "marie@example.com",
      country: "FR",
    },
  ]);

  const addUser = () => {
    if (profile.name && profile.email) {
      const newUser: UserProfile = {
        ...profile,
        id: Date.now().toString(),
      };
      setUsers([...users, newUser]);
      setProfile({ id: "", name: "", email: "", country: "US" });
    }
  };

  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          User Profile with Country Selection
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Enter name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div>
              <Label>Country</Label>
              <div className="mt-2 flex items-center gap-4">
                <FlagPicker
                  value={profile.country}
                  onValueChange={(country) =>
                    setProfile({ ...profile, country })
                  }
                  triggerPlaceholder="Select country"
                  searchPlaceholder="Search countries..."
                />

                {profile.country && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Selected:</span>
                    <Flag code={profile.country} showName size="sm" />
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={addUser}
              disabled={!profile.name || !profile.email}
              className="w-full">
              Add User
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No users yet. Add some users above!
            </p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Flag code={user.country} size="md" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeUser(user.id)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Basic Usage:</Label>
              <div className="rounded bg-gray-100 p-3 font-mono text-sm">
                {`import { FlagPicker, Flag } from '@/components/ui/flag-picker';

// In your component
const [country, setCountry] = useState<FlagCode>('US');

// In your JSX
<FlagPicker
  value={country}
  onValueChange={setCountry}
  triggerPlaceholder="Select country"
/>

<Flag code={country} showName size="lg" />`}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Database Storage:</Label>
              <div className="rounded bg-gray-100 p-3 font-mono text-sm">
                {`// Country codes are stored as strings in the database
// e.g., "US", "GB", "DE", "FR", etc.

interface UserProfile {
  id: string;
  name: string;
  country: FlagCode; // "US" | "GB" | "DE" | ...
}

// When rendering from database
<Flag code={user.country} showName />`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
