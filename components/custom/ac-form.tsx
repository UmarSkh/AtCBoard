// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useRouter } from "next/navigation"

// const formSchema = z.object({
//   pid: z.coerce
//     .number()
//     .positive({ message: "Please enter a valid positive Integer" }),
// })

// export function ACForm() {

//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       pid: 123,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {



//     const pid = values.pid;


//     router.push(`/problems/${pid}`);

//   }

//   return (
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="pid"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Problem ID</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter Problem ID" {...field} />
//                 </FormControl>
//                 <FormDescription>This is your Problem ID.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//   )


// }







"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  ctype: z.enum(["abc", "arc", "ahc"], {
    errorMap: () => ({ message: "Please select a valid Contest Type" }),
  }),
  cid: z.coerce
    .number()
    .positive({ message: "Please enter a valid positive Integer" }),
  ctask: z.enum(["a", "b", "c", "d"], {
    errorMap: () => ({ message: "Please select a valid task" }),
  }),
});

export function ACForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ctype: "abc",
      cid: 123,
      ctask: "a"
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const ctype = values.ctype;
    const cid = values.cid;
    const ctask = values.ctask;
    const url = ctype+cid+ctask;

    const data = {
      "ctype": ctype,
      "cid": cid.toString(),
      "ctask": ctask,
    }

    const params = new URLSearchParams(data);
    const queryString = params.toString();

    router.push(`/problems/${url}?${queryString}`);

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ctype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Contest Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="abc">AtCoder Beginner Contest</SelectItem>
                  <SelectItem value="arc">AtCoder Regular Contest</SelectItem>
                  <SelectItem value="ahc">AtCoder Heuristic Contest</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Contest ID" {...field} type="number" />
              </FormControl>
              <FormDescription>Enter a positive integer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ctask"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Task</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Contest Task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a">a</SelectItem>
                  <SelectItem value="b">b</SelectItem>
                  <SelectItem value="c">c</SelectItem>
                  <SelectItem value="d">d</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
