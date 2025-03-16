"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Search, MoreVertical, UserPlus, Edit, Trash, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Define the user type
interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "trial"
  hasSubscription: boolean
  registeredAt: string
}

// Form schema for adding a new user
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  hasSubscription: z.boolean().default(false),
})

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      hasSubscription: false,
    },
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // This is mock data for demonstration
        const mockUsers: User[] = [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            status: "active",
            hasSubscription: true,
            registeredAt: "2023-01-15T10:30:00Z",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            status: "active",
            hasSubscription: true,
            registeredAt: "2023-02-20T14:45:00Z",
          },
          {
            id: "3",
            name: "Robert Johnson",
            email: "robert@example.com",
            status: "trial",
            hasSubscription: false,
            registeredAt: "2023-03-10T09:15:00Z",
          },
          {
            id: "4",
            name: "Emily Davis",
            email: "emily@example.com",
            status: "active",
            hasSubscription: true,
            registeredAt: "2023-04-05T16:20:00Z",
          },
          {
            id: "5",
            name: "Michael Wilson",
            email: "michael@example.com",
            status: "inactive",
            hasSubscription: false,
            registeredAt: "2023-05-12T11:10:00Z",
          },
        ]

        setUsers(mockUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = async (data: z.infer<typeof userFormSchema>) => {
    try {
      // In a real implementation, you would send this data to your API
      // This is a simplified example

      const newUser: User = {
        id: `${users.length + 1}`,
        name: data.name,
        email: data.email,
        status: data.hasSubscription ? "active" : "trial",
        hasSubscription: data.hasSubscription,
        registeredAt: new Date().toISOString(),
      }

      setUsers([...users, newUser])

      toast({
        title: "User Added",
        description: `${data.name} has been added successfully.`,
      })

      form.reset()
      setIsAddUserDialogOpen(false)
    } catch (error) {
      console.error("Error adding user:", error)
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))

      toast({
        title: "User Deleted",
        description: "The user has been deleted successfully.",
      })
    }
  }

  const handleToggleSubscription = (userId: string, hasSubscription: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              hasSubscription,
              status: hasSubscription ? "active" : "trial",
            }
          : user,
      ),
    )

    toast({
      title: hasSubscription ? "Subscription Activated" : "Subscription Deactivated",
      description: `The user's subscription has been ${hasSubscription ? "activated" : "deactivated"}.`,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users</h1>

        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account. You can optionally activate a subscription for this user.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasSubscription"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Activate Subscription</FormLabel>
                        <p className="text-sm text-gray-400">
                          This will give the user immediate access to all premium features.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their subscriptions</CardDescription>
            </div>

            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-4">No users found</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-6 font-medium text-gray-400 pb-2">
                <div>Name</div>
                <div>Email</div>
                <div>Status</div>
                <div>Subscription</div>
                <div>Registered</div>
                <div>Actions</div>
              </div>

              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-6 py-2 border-b border-gray-800">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : user.status === "trial"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {user.status === "active" ? "Active" : user.status === "trial" ? "Trial" : "Inactive"}
                      </Badge>
                    </div>
                    <div>
                      {user.hasSubscription ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-500 hover:text-green-600"
                          onClick={() => handleToggleSubscription(user.id, false)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Active
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-300"
                          onClick={() => handleToggleSubscription(user.id, true)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Inactive
                        </Button>
                      )}
                    </div>
                    <div>{new Date(user.registeredAt).toLocaleDateString()}</div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleSubscription(user.id, !user.hasSubscription)}>
                            {user.hasSubscription ? (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                Deactivate Subscription
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate Subscription
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-500 focus:text-red-500"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

