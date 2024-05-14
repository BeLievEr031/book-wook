// import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import AsyncSelect from 'react-select/async';
import { z } from "zod"
import { Worker, Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"
import DefaultThumbnailSrc from "@/assets/thumbnail_upload.png"
import DefaultPdfSrc from "@/assets/pdf_upload.png"
import { CircleX, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";

const bookSchema = z.object({
  title: z.string().min(3, {
    message: "title must be at least 3 characters.",
  }),
  author: z.string().min(2, {
    message: "author must be at least 3 characters.",
  }),
  description: z.string().min(15, {
    message: "Description must be at least 15 characters.",
  }),
  price: z.number(),
  quantity: z.number(),
  rentprice: z.number(),
  isForRent: z.string(),
  isForSale: z.string(),
})

type book = z.infer<typeof bookSchema>

function AddBook() {
  const [open, setOpen] = useState(false)
  const form = useForm<book>();
  const { toast } = useToast();
  const [fileUrl, setUrl] = useState<{ thumbnail: string, pdf: string, photos: string[] }>({ thumbnail: "", pdf: "", photos: [] })
  const handleFile = (event: ChangeEvent<HTMLInputElement>, type: string) => {

    const files = event.target.files && event.target.files;


    // Check if file is an image
    if (files) {
      const arr = [...fileUrl.photos]
      for (let i = 0; i < files?.length; i++) {
        if (files[i]) {
          const reader = new FileReader();

          reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target && event.target.result) {
              const url = event.target.result as string;
              const imageFormats = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/bmp',
                'image/svg+xml',
                'image/webp']
              if (type === "thumbnail") {
                if (!imageFormats.includes(files[i].type)) {
                  return toast({
                    title: "INVALID FILE TYPE",
                    description: "Please upload Image file only.",
                    variant: "destructive",
                    duration: 1000
                  })
                }
                setUrl({ ...fileUrl, thumbnail: url })
              } else if (type === "pdf") {
                if (files[i].type !== "application/pdf") {
                  return toast({
                    title: "INVALID FILE TYPE",
                    description: "Please upload PDF file only.",
                    variant: "destructive",
                    duration: 1000
                  })
                }
                setUrl({ ...fileUrl, pdf: url })
              } else if (type === "photos") {
                if (!imageFormats.includes(files[i].type)) {
                  return toast({
                    title: "INVALID FILE TYPE",
                    description: "Please upload All Image file only.",
                    variant: "destructive",
                    duration: 1000
                  })
                }

                arr.push(url);
                setUrl({ ...fileUrl, photos: [...arr] })
              } else {

              }
            }
          };
          // Read image file as data URL
          reader.readAsDataURL(files[i]);
        } else {
          alert('Please select an image file.');
        }
      }
    }

  }

  const colourOptions = [{ id: 1, label: "red" }, { id: 2, label: "pink" }]
  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<{ id: number, label: string }[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  const handleRemoveImage = (idx: number) => {
    fileUrl.photos.splice(idx, 1)
    setUrl({ ...fileUrl })
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 select-none">
      <div className="flex items-center border-b-2">
        <h1 className="text-lg font-semibold md:text-2xl">Add Book</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full relative">
        <div className="w-full md:w-1/3 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => { })} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of book" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author of book" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-0">
                <Label htmlFor="genre" className="font-bold"> Genre</Label>
                <AsyncSelect id="genre" cacheOptions defaultOptions loadOptions={promiseOptions} className="mt-2" />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price of book" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rentprice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Rent price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Rent price of book" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Quantity of book" {...field} className="appearance-none" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">

                <FormField
                  control={form.control}
                  name="isForSale"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Do You Want to sale?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Do You Want to sale?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"true"}>true</SelectItem>
                          <SelectItem value={"false"}>false</SelectItem>
                        </SelectContent>
                      </Select>

                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isForRent"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Do You Want to rent?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Do You Want to rent?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"true"}>true</SelectItem>
                          <SelectItem value={"false"}>false</SelectItem>
                        </SelectContent>
                      </Select>

                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Book Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" placeholder="Type your Book Description here." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="absolute bottom-0 md:right-4 md:bottom-0 space-x-3">
                <Button variant={"destructive"} className="font-bold">Cancle</Button>
                <Button type="submit" variant={"save"}>Submit</Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="w-full md:w-1/2 p-2">
          <div className="flex w-full gap-6">
            <div className="w-1/2">
              <img src={fileUrl.thumbnail ? fileUrl.thumbnail : DefaultThumbnailSrc} alt="" className="border w-full h-[250px] bg-cover rounded-xl" />

              <div className="mt-2">
                <Label htmlFor="thumbnail" className="uppercase font-bold">Thumbnail</Label>
                <Input id="thumbnail" type="file" onChange={(e) => handleFile(e, "thumbnail")} />
              </div>
            </div>
            <div className="w-1/2 relative">
              <img src={fileUrl.pdf ? fileUrl.pdf : DefaultPdfSrc} alt="" className="border w-full h-[250px] bg-cover rounded-xl" />
              <div className="mt-2">
                <Label htmlFor="pdf" className="uppercase font-bold">Pdf</Label>
                <Input id="pdf" type="file" onChange={(e) => handleFile(e, "pdf")} />
              </div>

              {fileUrl.pdf && <div className="flex justify-center items-center absolute w-full h-[78%] rounded-xl bg-slate-400/85 top-0 left-0 text-2xl cursor-pointer font-bold text-white uppercase text-center">
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="threeD" className="font-bold">Preview PDF.</Button>
                  </DrawerTrigger>
                  <DrawerContent className="flex justify-center">
                    {fileUrl.pdf && <div className="flex justify-center w-full h-[550px]">
                      <div className="w-full md:w-[50%]">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                          <Viewer fileUrl={fileUrl.pdf} />
                        </Worker>
                      </div>
                    </div>
                    }
                    <DrawerFooter className="pt-2">
                      <DrawerClose asChild>
                        <Button variant="threeD" className="w-1/3 mx-auto text-white font-bold">
                          Close
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>}
            </div>
          </div>

          <div className="flex gap-2 w-full border h-[125px] mt-6 p-4 rounded-lg">
            {
              fileUrl.photos.map((photoSrc, index) => {
                return <div key={index} className="w-1/4 h-full bg-slate-200/100 relative rounded-lg">
                  <img src={photoSrc} alt="" className="border w-full h-full bg-cover rounded-lg " />
                  <CircleX className="absolute right-1 top-1 cursor-pointer bg-slate-100/50 rounded-full " onClick={() => { handleRemoveImage(index) }} />
                </div>
              })
            }
            {
              fileUrl.photos.length < 4 &&
              <div className="w-1/4 h-full rounded-lg bg-slate-200 relative">
                <Label htmlFor="photos" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Plus />
                </Label>
                <Input id="photos" type="file" multiple className="w-full h-full cursor-pointer absolute top-0 left-0 opacity-0" onChange={(e) => handleFile(e, "photos")} />
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddBook