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
import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const AuctionForm = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof createAuctionFormSchema>>({
    resolver: zodResolver(createAuctionFormSchema),
  });

  async function onSubmit(values: any) {
    try {
      if (fileInput.current) {
        const files = Array.from(fileInput.current.files!);
        const formData = new FormData();

        files.forEach((file) => {
          formData.append('Files', file);
        });

        let date = new Date(values.AuctionEnd);
        var dateString = date.toISOString();

        for (const key in values) {
          if (key === 'AuctionEnd') {
            formData.append(key, dateString);
          } else {
            formData.append(key, values[key]);
          }
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auctions`,
            formData,
            {
              headers: {
                Authorization: await getHeaders(),
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          toast.success('Auction has been createed successfully');
          router.push(`/auctions/${response.data.id}`);
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }
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
          <AvatarImage src={''} />
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
            <Input type="file" id="files" ref={fileInput} multiple />
          </div>
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
