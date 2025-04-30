'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import {useRouter} from "next/navigation"

import {useForm} from 'react-hook-form';
//import {Form} from '@/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from "zod";
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import {useUploadThing} from "@/lib/uploadthing"
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        email: string;
        name: string;
        image: string;
        genre: string;
        instrument: string;
    }
    btnTitle: string;
}

const AccountProfile = ({user, btnTitle}: Props) =>  {
  const [files ,setfiles] = useState<File[]>([])
  const{startUpload} = useUploadThing("media")
  const randomID = Math.floor(Math.random() * (128 - 0 + 1));
  const router = useRouter();

  const form = useForm({resolver: zodResolver(UserValidation), //schema
      defaultValues: {
      profile_photo: user?.image || "",
      email: user?.email || "",
      name: user?.name || '',
      username: user?.username || '',
      instrument: user?.instrument||'',
      genre: user?.genre || "",
      id: randomID,
      }
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) =>{
    e.preventDefault();
    const fileReader = new FileReader()

    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0];
      setfiles(Array.from(e.target.files));

      if(!file.type.includes('image')) return;

      fileReader.onload = async(event) => {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      }
      fileReader.readAsDataURL(file);
    }
  }
 
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
      try{
        const blob = values.profile_photo; //Image handling
        const hasImageChanged = isBase64Image(blob);
        if(hasImageChanged){
          const imgRes = await startUpload(files)

          if(imgRes && imgRes[0].ufsUrl){
            values.profile_photo = imgRes[0].ufsUrl;
          }

          return;
        }


        
        try{ //POST Request
          console.log(values)

          const response = await axios.post("/api/userPOST", values)
          alert("Submission Success")
        }catch (error){
          console.error("Error w/ submission", error)
          alert("Submission Failure")
        }

        router.push("/")

      }catch(error){
        console.error('Error: ', error);
      }
    }

    return (
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className= "bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-[#D6CBEF] flex flex-col items-center p-6 gap-4"
        >
          <FormField 
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className = "flex items-center gap-4 text-[#5D4197] ">
                <FormLabel className = "account-form_image-label text-[#5D4197]"> {field.value?
                (<Image
                src = {field.value}
                alt = "profile photo"
                width = {96}
                height = {96}
                priority
                className = "rounded-full object-contain text-[#5D4197]"
                />
                ): (<Image
                  src = "/assets/profile.svg"
                  alt = "profile photo"
                  width = {24}
                  height = {24}
                  className = "object-contain"
                  />)}
              </FormLabel>
                <FormControl className= "flex-1 text-base-semibold text-[#5D4197] border-4 border-[#D6CBEF]">
                  <Input 
                  type = "file"
                  accept = "image/*" 
                  placeholder = "Upload a photo"
                  className = "account-form_image-input data-[placeholder]:placeholder:text-[#5D4197] border-4 border-[#D6CBEF]" 
                  onChange = {(e)=> handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className = "flex flex-col w-full gap-3 ">
                <FormLabel className = "text-base-semibold text-[#5D4197]">
                Name 
              </FormLabel>
                <FormControl>
                  <Input 
                  type= "text"
                  className = "account-form_input no-focus text-[#5D4197] border-4 border-[#D6CBEF]" 
                  {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className = "flex flex-col w-full gap-3">
                <FormLabel className = "text-base-semibold text-[#5D4197] ">
                Username
              </FormLabel>
                <FormControl>
                  <Input 
                  type= "text"
                  className = "account-form_input no-focus text-[#5D4197] border-4 border-[#D6CBEF]" 
                  {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "text-[#5D4197]">Favorite Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className = "border-4 border-[#D6CBEF]">
                  <SelectTrigger className="w-[500px] text-[#5D4197] ">
                    <SelectValue placeholder="Select your favorite music genre" className = "text-[#5D4197]"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="Hip Hop">Hip-Hop</SelectItem>
                  <SelectItem value="Electronic">Electronic</SelectItem>
                  <SelectItem value="Jazz">Jazz</SelectItem>
                  <SelectItem value="Classical">Classical</SelectItem>
                  <SelectItem value="Country">Country</SelectItem>
                  <SelectItem value="Folk">Folk</SelectItem>
                  <SelectItem value="Metal">Metal</SelectItem>
                  <SelectItem value="Blues">Blues</SelectItem>
                  <SelectItem value="Reggae">Reggae</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="instrument"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "text-[#5D4197]">Preferred Instrument</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className = "border-4 border-[#D6CBEF]">
                  <SelectTrigger className="w-[500px] text-[#5D4197]">
                    <SelectValue className = "text-[#5D4197]" placeholder="Select your primary instrument"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="Guitar">Guitar</SelectItem>
                    <SelectItem value="Bass">Bass</SelectItem>
                    <SelectItem value="Drums">Drums</SelectItem>
                    <SelectItem value="Vocals">Vocals</SelectItem>
                    <SelectItem value="Keyboard">Keyboard</SelectItem>
                    <SelectItem value="Piano">Piano</SelectItem>
                    <SelectItem value="Synthesizer">Synthesizer</SelectItem>
                    <SelectItem value="Banjo">Banjo</SelectItem>
                    <SelectItem value="Ukulele">Ukulele</SelectItem>
                    <SelectItem value="Violin">Violin</SelectItem>
                    <SelectItem value="Viola">Viola</SelectItem>
                    <SelectItem value="Cello">Cello</SelectItem>
                    <SelectItem value="Harp">Harp</SelectItem>
                    <SelectItem value="Trumpet">Trumpet</SelectItem>
                    <SelectItem value="Trombone">Trombone</SelectItem>
                    <SelectItem value="Tuba">Tuba</SelectItem>
                    <SelectItem value="Bassoon">Bassoon</SelectItem>
                    <SelectItem value="Oboe">Oboe</SelectItem>
                    <SelectItem value="Saxophone">Saxophone</SelectItem>
                    <SelectItem value="Flute">Flute</SelectItem>
                    <SelectItem value="Clarinet">Clarinet</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
              </FormDescription>
              <FormMessage/>
            </FormItem>
            )}
          />

          <Button type="submit">Submit
            <Link href="/"></Link>
          </Button>
          
        </form>
      </Form>
    )
  }
export default AccountProfile;
