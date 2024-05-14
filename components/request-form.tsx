'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { baseRequestSchema, BaseRequestFormValues } from '@/app/validationSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Type_of_Request, Status, Request } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { addRequest, updateRequest } from '@/app/requests/_actions/requests'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Spinner from '@/components/spinner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function RequestForm({ request }: { request: Request | null }) {
    const router = useRouter()
    const isAddRequest = !request?.id

    const defaultValues =
        request == null
            ? {
                  type: Type_of_Request.Manufacturing_Drawing,
                  title: '',
                  customer: '',
                  description: '',
                  status: Status.Open,
              }
            : {
                  type: request?.type as Type_of_Request,
                  title: request?.title,
                  customer: request?.customer ?? '',
                  description: request?.description ?? '',
                  status: request?.status,
              }
    const form = useForm<BaseRequestFormValues>({
        resolver: zodResolver(baseRequestSchema),
        defaultValues: defaultValues,
        mode: 'onSubmit',
    })

    const onSubmit: SubmitHandler<Partial<BaseRequestFormValues>> = async (data) => {
        const result = baseRequestSchema.safeParse(data)
        if (!result.success) {
            return result.error.format()
        }
        const task = isAddRequest ? await addRequest(data) : await updateRequest(request.id, data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Request Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a request type' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={Type_of_Request.Manufacturing_Drawing}>
                                        {Type_of_Request.Manufacturing_Drawing}
                                    </SelectItem>
                                    <SelectItem value={Type_of_Request.Basic_Drawing}>
                                        {Type_of_Request.Basic_Drawing}
                                    </SelectItem>
                                    <SelectItem value={Type_of_Request.Drawing_Update}>
                                        {Type_of_Request.Drawing_Update}
                                    </SelectItem>
                                    <SelectItem value={Type_of_Request.Technical_Enquiry}>
                                        {Type_of_Request.Technical_Enquiry}
                                    </SelectItem>
                                    <SelectItem value={Type_of_Request.Other}>{Type_of_Request.Other}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='request title...'
                                    {...field}
                                    className='w-[450px] text-left font-normal'
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='customer'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer</FormLabel>
                            <FormControl>
                                <Input placeholder='Customer' {...field} value={field.value || ''} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Please include all information for the request.'
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isAddRequest && (
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='grid grid-cols-4 gap-4'
                                >
                                    <div>
                                        <RadioGroupItem value={Status.Open} id='open' className='peer sr-only' />
                                        <Label
                                            htmlFor='open'
                                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                                        >
                                            {Status.Open}
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value={Status.Completed}
                                            id='completed'
                                            className='peer sr-only'
                                        />
                                        <Label
                                            htmlFor='completed'
                                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-green-600 peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:border-primary'
                                        >
                                            {Status.Completed}
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value={Status.In_Progress}
                                            id='in_progress'
                                            className='peer sr-only'
                                        />
                                        <Label
                                            htmlFor='in_progress'
                                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-orange-600 peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:border-primary'
                                        >
                                            {Status.In_Progress}
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value={Status.Cancelled}
                                            id='cancelled'
                                            className='peer sr-only'
                                        />
                                        <Label
                                            htmlFor='cancelled'
                                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-red-600 peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:border-primary'
                                        >
                                            {Status.Cancelled}
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <div className='flex justify-between space-x-2 py-6'>
                    <Button variant='outline' onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={form.formState.isSubmitting}>
                        Save {form.formState.isSubmitting && <Spinner />}
                    </Button>
                </div>
                {!isAddRequest && (
                    <div className='text-center text-nowrap'>
                        Last updated at
                        <span className='font-bold'> {request && request.updatedAt.toLocaleDateString('en-AU')}</span>
                    </div>
                )}
            </form>
        </Form>
    )
}
