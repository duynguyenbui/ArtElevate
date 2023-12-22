'use client';

import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Send } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { getHeaders } from '@/actions/auth-action';
import { createAuctionFormSchema } from '@/helpers/create-auction-form-schema';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const AuctionForm = () => {
  const [preview, setPreview] = useState('');

  const router = useRouter();
  const form = useForm<z.infer<typeof createAuctionFormSchema>>({
    resolver: zodResolver(createAuctionFormSchema),
  });

  async function onSubmit(values: z.infer<typeof createAuctionFormSchema>) {
    try {
      const filesInput = document.getElementById('files') as HTMLInputElement;
      let Files: File[] = [];
      Array.from(filesInput.files!).forEach((file) => {
        Files.push(file);
      });
      console.log({ ...values, Files });
      const res = await axios.postForm(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auctions`,
        { ...values, Files },
        {
          headers: {
            Authorization: await getHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Auction has been createed successfully');
      router.push(`/auctions/${res.data.id}`);
    } catch (error) {
      console.error('An error occurred during the POST request:', error);
      toast.error('Auction has not been created! Please try again later!');
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-start">Auction Form</h1>
        <Avatar className="w-24 h-24 mr-[75px]">
          <AvatarImage src={preview} />
          <AvatarFallback>BU</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:grid md:grid-cols-3 md:gap-5"
        >
          <FormField
            control={form.control}
            name="Artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input placeholder="Artist" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input placeholder="Height" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input placeholder="Width" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Medium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medium</FormLabel>
                <FormControl>
                  <Input placeholder="Medium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="Year" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ReservePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reserve Price</FormLabel>
                <FormControl>
                  <Input placeholder="Reserve Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="p-2">
            <FormLabel>Files</FormLabel>
            <Input type="file" id="files" multiple />
          </div>
          {/* <FormField
            control={form.control}
            name="Files"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Files</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Files"
                    type="file"
                    multiple
                    {...rest}
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      console.log(files);
                      setPreview(displayUrl);
                      onChange(files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="AuctionEnd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'text-left',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Auction End</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
