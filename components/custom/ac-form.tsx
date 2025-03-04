"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  pid: z.coerce
    .number()
    .positive({ message: "Please enter a valid positive Integer" }),
})

export function ACForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pid: 123,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {



    const pid = values.pid;


    router.push(`/problems/${pid}`);

  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Problem ID" {...field} />
                </FormControl>
                <FormDescription>This is your Problem ID.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )


}
