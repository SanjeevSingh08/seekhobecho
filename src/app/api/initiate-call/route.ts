

import { VapiClient } from '@vapi-ai/server-sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    // const requiredFields = ['category', 'Name', 'area', 'property', 'marble', 'city', 'mobileNumber'];
    // for (const field of requiredFields) {
    //   if (!body[field]) {
    //     return NextResponse.json(
    //       { error: `Missing required field: ${field}` },
    //       { status: 400 }
    //     );
    //   }
    // }

    const token = process.env.NEOBOUND_API || '';
    const assistantId = process.env.ASSISTANT_ID || '';
    const phoneNumberId = process.env.PHONE_NUMBER_ID || '';
    const client = new VapiClient({ token });
    let response;
    try {
      response = await client.calls.create({
        assistantId: assistantId,
        phoneNumberId: phoneNumberId,
        customer: {
          number: body.mobileNumber.startsWith('+91') ? body.mobileNumber : `+91${body.mobileNumber}`, // Add +91 if not present
        },
        assistantOverrides: {
          variableValues: {
            name: `${body.Name}`,
            // area: `${body.area}`,
            // property_type: `${body.property}`,
            // marble: `${body.marble}`,
            // city: `${body.city}`,
          }
          // firstMessage: `Hello, this is a test call from Neobound Technology. Am I speaking to ${lead.firstName} ${lead.lastName}?`,
        }
      });
      console.log('Call initiated successfully for number:', body.mobileNumber, response);
      return NextResponse.json(
        { message: 'Call initiated successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error initiating call:', error);
      return NextResponse.json(
        { error: 'Failed to initiate call' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
