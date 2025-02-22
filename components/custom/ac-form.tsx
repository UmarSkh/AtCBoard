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
// import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  pid: z.coerce
    .number()
    .positive({ message: "Please enter a valid positive Integer" }),
})

export function ACForm() {



  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pid: 123,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const pid = values.pid

    const data = {
      id: pid,
    }


    const r = await fetch("http://localhost:3333/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res = await r.json()
    console.log("Next start........")
    console.log(res)
    console.log("Next end........")

    // const resString = JSON.stringify(res);

    // console.log(resString)

    // const encodedResString = encodeURIComponent(resString)


    // router.push(`/problems?dataAsString=${encodedResString}`);



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
