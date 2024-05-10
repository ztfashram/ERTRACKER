'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Type_of_Request } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Request } from '@prisma/client'
import { baseRequestSchema, BaseRequestFormValues } from '@/app/validationSchema'
import Spinner from '@/components/spinner'
import { addRequest, updateRequest } from '@/app/requests/_actions/requests'

const defaultValues: Partial<BaseRequestFormValues> = {
    type: 'Manufacturing_Drawing',
    title: '',
    customer: '',
    description: '',
    isCompleted: false,
}

export function RequestForm({ request }: { request?: Request | null }) {
    const router = useRouter()

    const form = useForm<BaseRequestFormValues>({
        resolver: zodResolver(baseRequestSchema),
        defaultValues,
        mode: 'onChange',
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(addRequest)} className='space-y-6'>
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
                                    className='w-[540px] text-left font-normal'
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
                <div className='flex justify-between space-x-2 pb-6'>
                    <Button variant='ghost' onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={form.formState.isSubmitting}>
                        Submit {form.formState.isSubmitting && <Spinner />}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
