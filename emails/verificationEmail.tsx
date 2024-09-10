import {Html,
    Head,
    Font, 
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from "@react-email/components";

interface VerificationEmailProps{
    username: string,
    otp: string
}

export default function VerificationEmail({username, otp} : VerificationEmailProps){
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
                <Font fontFamily="Roboto"
                        fallbackFontFamily = "Verdana"
                        webFont = {{
                            url: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
                            format: 'woff2'

                        }}
                        fontWeight = {400}
                        fontStyle = "normal"
                        />
            </Head>
            <Preview>Here&apos;s your Verification Code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as= "h2">Namaste {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thankyou for registering with us, Please use the following code for completion of registration process:
                    </Text>
                </Row>
                <Row>
                    <Text>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Don't share this <b> OTP</b> with anyone. 
                    </Text>
                </Row>
                
            </Section>

        </Html>
    );
} 