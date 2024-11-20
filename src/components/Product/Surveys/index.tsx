import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconMessage,
    IconClock,
    IconGraph,
    IconFlask,
    IconToggle,
    IconPieChart,
    IconNotification,
    IconRewindPlay,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import { docsMenu } from '../../../navs'
import TeamRoadmap from 'components/TeamRoadmap'
import { Marquee } from 'components/Products/Marquee'
import RecentChange from '../RecentChange'
import TeamMembers from '../TeamMembers'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import Comparison from '../Comparison'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { Question } from 'components/Products/Question'
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'
import { DocLinks } from 'components/Products/DocsLinks'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import { FAQ } from 'components/Products/FAQ'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Plans from 'components/Pricing/Plans'
import Logo from 'components/Logo'

const product = {
    slug: 'surveys',
    lowercase: 'surveys',
    capitalized: 'Surveys',
    freeTier: '250 survey responses',
}

const team = 'Surveys'
const teamSlug = '/teams/surveys'

const featuresPerRow = 3
const features = [
    {
        title: 'Question types',
        description: 'Multiple choice, multi-select, numerical rating, emoji reaction, embedded links',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/question-types.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Templates',
        description: 'Choose from the library or start from scratch',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/templates.png"
                width={428}
                placeholder="none"
            />
        ),
        background: true,
        fade: true,
    },
    {
        title: 'Display Conditions',
        description: 'Display surveys based on URL, person property, or feature flag when used with Feature Flags',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/targeting.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Multi-step surveys',
        description: 'Up to 10 questions',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/steps.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Link somewhere',
        description: 'Send users to a webpage or invite them to book a meeting with a calendar invite',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/link-scheduler.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'No-code? Yes. API? Yes.',
        description:
            "Using PostHog.js? No more code required. But want to create your own UI? Check out the <a href='/docs/api/surveys'>Surveys API</a>.",
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/api.png"
                width={428}
                placeholder="none"
            />
        ),
        fade: true,
    },
]

const subfeaturesItemCount = 3
const subfeatures = [
    {
        title: 'Aggregated results',
        description: 'See feedback summarized and broken down per response',
        icon: <IconPieChart />,
    },
    {
        title: 'Slack notifications',
        description: 'Send realtime survey responses to a Slack channel',
        icon: <IconNotification />,
    },
    {
        title: 'Customizable wait periods',
        description: 'Set a delay before a survey opens',
        icon: <IconClock />,
    },
]

const questions = [
    {
        question: 'Would you like to book a user interview?',
        url: '/tutorials/feedback-interviews-site-apps',
    },
    {
        question: 'Would you like to be interviewed by our product team?',
    },
    {
        question: 'How would you feel if you could no longer use this product?',
    },
    {
        question: "How satisfied are you with the support you've received?",
    },
]

const faqs = [
    {
        question: 'How long do you retain survey data?',
        children:
            'Data is guaranteed to be retained for 7 years on any paid plan and 1 year on a free plan. After 1 year, data may be moved into cold storage so queries may run more slowly.',
    },
    {
        question: 'Is there a free trial on paid plans?',
        children:
            'We have a generous free tier on every paid plan so you can try out the features before paying any money. (You\'ll need to enter your credit card info, but you can set a billing limit). If you have additional needs, such as enterprise features, please <a href="/talk-to-a-human">get in touch</a>.',
    },
    {
        question: 'What currency are your prices in?',
        children: 'All prices are in US Dollars (USD), excluding taxes.',
    },
    {
        question: 'Do you offer a discount for non-profits?',
        children:
            'Yes in most cases - 25% off any plan. Create your account, then email <a href="mailto:sales@posthog.com?subject=Non-profit%20discount">sales@posthog.com</a> from the same email address with some basic details on your organization. We will then apply a discount.',
    },
    {
        question: 'Are there any minimums or annual commitments?',
        children:
            'Nope. We can, however, offer annual commitments (for example, to maintain pricing) if you need them as part of an enterprise agreement.',
    },
]

const comparisonColumnCount = 5
const comparison = [
    {
        feature: 'Customizable pop-ups',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Live previews',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Multi-step surveys',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'API access',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Single choice questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Multiple choice questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Open text questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Numerical rating questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Emoji rating questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Third-party link support',
        companies: {
            Pendo: true,
            Hotjar: false,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by property',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by URL',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by feature flag',
        companies: {
            Pendo: false,
            Hotjar: false,
            Sprig: false,
            PostHog: true,
        },
    },
    {
        feature: 'Survey scheduling',
        companies: {
            Pendo: true,
            Hotjar: false,
            Sprig: false,
            PostHog: false,
        },
    },
    {
        feature: 'Export responses',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Slack integration',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        color: 'blue',
        product: 'Product analytics',
        description: 'Use insights to breakdown average scores, analyze results over time, or find trends.',
        url: '/product-analytics',
    },
    {
        icon: <IconToggle />,
        color: 'seagreen',
        product: 'Feature flags',
        description: 'Connect a survey to a feature flag to gather feedback on your latest ideas and tests.',
        url: '/feature-flags',
    },
    {
        icon: <IconRewindPlay />,
        color: 'yellow',
        product: 'Session replay',
        description:
            "Watch recordings of users completing a survey to understand full context about a user's behavior.",
        url: '/session-replay',
    },
]

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.164752 0.164752C0.384422 -0.0549175 0.740578 -0.0549175 0.960248 0.164752L6 5.20451L11.0398 0.164752C11.2594 -0.0549175 11.6156 -0.0549175 11.8352 0.164752C12.0549 0.384422 12.0549 0.740578 11.8352 0.960248L6.79549 6L11.8352 11.0398C12.0549 11.2594 12.0549 11.6156 11.8352 11.8352C11.6156 12.0549 11.2594 12.0549 11.0398 11.8352L6 6.79549L0.960248 11.8352C0.740578 12.0549 0.384422 12.0549 0.164752 11.8352C-0.0549175 11.6156 -0.0549175 11.2594 0.164752 11.0398L5.20451 6L0.164752 0.960248C-0.0549175 0.740578 -0.0549175 0.384422 0.164752 0.164752Z"
            fill="black"
        />
    </svg>
)

const CheckIcon = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.30769 10.6923L4.77736 11.2226C4.91801 11.3633 5.10878 11.4423 5.30769 11.4423C5.5066 11.4423 5.69737 11.3633 5.83802 11.2226L5.30769 10.6923ZM15.5303 1.53033C15.8232 1.23744 15.8232 0.762563 15.5303 0.46967C15.2374 0.176777 14.7626 0.176777 14.4697 0.46967L15.5303 1.53033ZM1.53033 5.85429C1.23744 5.56139 0.762563 5.56139 0.46967 5.85429C0.176777 6.14718 0.176777 6.62205 0.46967 6.91495L1.53033 5.85429ZM5.83802 11.2226L15.5303 1.53033L14.4697 0.46967L4.77736 10.162L5.83802 11.2226ZM0.46967 6.91495L4.77736 11.2226L5.83802 10.162L1.53033 5.85429L0.46967 6.91495Z"
            fill="currentColor"
        />
    </svg>
)

const MockSurvey = () => {
    const formStyles = {
        color: 'black',
        borderColor: 'rgb(201, 198, 198)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderRadius: '10px',
    }

    const surveyBoxStyles = {
        backgroundColor: 'rgb(238, 237, 237)',
    }

    const options = ['Not disappointed', 'Somewhat disappointed', 'Very disappointed']

    return (
        <form className="survey-form fixed bottom-0 right-0" style={formStyles}>
            <div className="survey-box" style={surveyBoxStyles}>
                <div className="cancel-btn-wrapper">
                    <button className="form-cancel" disabled>
                        <CloseIcon />
                    </button>
                </div>

                <div>
                    <div style={surveyBoxStyles}>
                        <div className="survey-question">How would you feel if you could no longer use PostHog?</div>
                    </div>

                    <div className="multiple-choice-options">
                        {options.map((option, index) => (
                            <div className="choice-option" key={index}>
                                <input
                                    type="radio"
                                    id={`surveyQuestion0Choice${index}`}
                                    name="question0"
                                    value={option}
                                />
                                <label htmlFor={`surveyQuestion0Choice${index}`} style={{ color: 'black' }}>
                                    {option}
                                </label>
                                <span className="choice-check" style={{ color: 'black' }}>
                                    <CheckIcon />
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bottom-section">
                        <div className="buttons">
                            <button className="form-submit" type="button" style={{ color: 'white' }}>
                                Submit
                            </button>
                        </div>
                        <Link to="https://posthog.com" externalNoIcon className="footer-branding !text-inherit">
                            Survey by <Logo className="w-16" />
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const ProductSurveys = () => {
    const { purplewave, elevenlabs } = useStaticQuery(graphql`
        fragment ProductCustomerFragment on Mdx {
            fields {
                slug
            }
            frontmatter {
                logo {
                    publicURL
                }
                logoDark {
                    publicURL
                }
            }
        }
        {
            purplewave: mdx(slug: { eq: "customers/purplewave" }) {
                ...ProductCustomerFragment
            }
            elevenlabs: mdx(slug: { eq: "customers/elevenlabs" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Surveys - PostHog"
                description="Ask anything with no-code surveys – or use the API for complete control."
                image={`/images/og/surveys.jpg`}
            />
            <MockSurvey />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="salmon"
                    icon={<IconMessage />}
                    product={product.capitalized}
                    title='Ask anything with <span class="text-red dark:text-yellow">no-code surveys</span>'
                    description="Build in-app popups with freeform text responses, multiple choice, NPS, ratings, and emoji reactions. Or use the API for complete control."
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-surveys.png"
                        alt="Screenshot of survey results in PostHog"
                        className="w-full max-w-[1360px]"
                        placeholder="none"
                    />
                </div>
                <section id="customers" className="-mt-36 pt-36">
                    <ul className="list-none p-0 grid md:grid-cols-2 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="reached a 25% response rate with surveys"
                            quote="I hate having to switch software. With PostHog, all our data and survey responses were centralized in one platform."
                            customer={purplewave}
                        />
                        <CustomerCard
                            outcome="uses surveys to organize interviews and more"
                            quote="We even use surveys to send a little pop-up to our most active users and ask them to review us on G2."
                            customer={elevenlabs}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll exclude={['Installation']} />

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h3 className="text-3xl text-center mb-8">Features</h3>
                    <ul className={`list-none p-0 grid md:grid-cols-${featuresPerRow} gap-12 mb-8`}>
                        {features.map((feature, index) => {
                            return <Feature {...feature} key={index} />
                        })}
                    </ul>

                    <ul className={`list-none p-0 grid grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}>
                        {subfeatures.map((subfeature, index) => {
                            return <Subfeature {...subfeature} key={index} />
                        })}
                    </ul>
                </section>

                <section className="bg-accent dark:bg-accent-dark">
                    <Marquee product={product.capitalized} shortFade={true}>
                        {questions.map((question, index) => {
                            return <Question {...question} key={index} />
                        })}
                    </Marquee>
                </section>
            </div>
            <section
                id="pricing"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 py-20`}
            >
                <div className="flex flex-col-reverse md:flex-row md:gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                        <p className="">
                            Use {product.lowercase} free. Or enter a credit card for advanced features.{' '}
                            <br className="hidden lg:block" />
                            Either way, your first {product.freeTier} are free – every month.
                        </p>
                    </div>
                    <div className="md:w-96">
                        <CloudinaryImage
                            placeholder="none"
                            quality={100}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/surveys-hog.png"
                            alt=""
                        />
                    </div>
                </div>

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="flex-grow overflow-auto px-5 md:px-0">
                        <Plans showHeaders={false} showCTA={false} groupsToShow={['surveys']} />
                    </div>

                    <div className="px-5 md:px-0 lg:w-96 lg:mt-4">
                        <h4 className="text-3xl">FAQs</h4>
                        {faqs.map((faq, index) => {
                            return <FAQ {...faq} key={index} />
                        })}
                    </div>
                </div>
            </section>

            <div className={`${fullWidthContent ? 'max-w-full px-0 md:px-8' : 'max-w-7xl'} mx-auto`}>
                <div id="posthog-vs">
                    <section>
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
                    </section>

                    <section className="mb-20">
                        <h3 className="text-center mb-8">So, what's best for you?</h3>
                        <div className="mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                            <VsCompetitor
                                title="Reasons a competitor may be best for you(for now...)"
                                image={
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/competitors-surveys.png"
                                        className="max-w-[159px]"
                                        placeholder="none"
                                    />
                                }
                            >
                                <ul>
                                    <li>
                                        Forms
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                PostHog offers multi-step surveys, but they won't be full-page forms
                                                such as Typeform or Google Forms
                                            </li>
                                        </ul>
                                    </li>
                                    <li>AI-powered analysis or recommendations based on results</li>
                                    <li>Limited formatting options</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>No-code surveys with customizable colors and removable branding</li>
                                    <li>Automatic NPS score calculations</li>
                                    <li>Robust targeting &amp; integration with feature flags</li>
                                    <li>Tight integration with analytics, experiments, and session replay</li>
                                </ul>
                            </VsPostHog>
                        </div>

                        <p className="text-center text-sm font-medium">
                            Have questions about PostHog? <br className="md:hidden" />
                            <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                            <Link to="/talk-to-a-human">book a demo</Link>.
                        </p>
                    </section>
                </div>

                <section id="tutorials">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Featured tutorials</h3>
                    <p className="mt-0 text-opacity-75 text-center mb-6">
                        Visit the <Link to="/tutorials">tutorials</Link> section for more.
                    </p>

                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20mx-5 md:mx-0">
                        <TutorialCard
                            title="How to run a fake door test"
                            description='A fake door test is when you create a "fake" UI or experience for a product or feature you are thinking of building.'
                            url="/tutorials/fake-door-test"
                        />
                        <TutorialCard
                            title="Get feedback and book user interviews with surveys"
                            description="PostHog's surveys help automate the process of getting feedback and booking interviews. In this tutorial, we show how to set up surveys to do both."
                            url="/tutorials/feedback-interviews-site-apps"
                        />
                        <TutorialCard
                            title="How to measure your NPS score in PostHog"
                            description="Asking NPS asking users how likely they are to recommend your product or service, so you can gauge product-market fit."
                            url="/tutorials/nps-survey"
                        />
                        <TutorialCard
                            title="How to create custom surveys"
                            description="Use the API to create a completely custom experience."
                            url="/tutorials/survey"
                        />
                    </ul>
                </section>

                {/*
        <section id="installation" className="mb-20 px-5 md:px-0">
          <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
          <p className="mt-0 opacity-50 text-center mb-12">
            Here are some ways you can fine tune how you implement {product.lowercase}.
          </p>

          <ContentViewer sticky={false} scrollToTop={false} content={[...SessionReplay]} />
        </section>
        */}

                <section id="docs" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'surveys').children} />
                </section>

                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building {product.lowercase}.
                    </p>
                    <TeamMembers teamName={team} />
                </section>

                <section id="roadmap" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Roadmap &amp; changelog</h3>

                    <p className="text-center mb-8">Here’s what the team is up to.</p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <RecentChange team={team} />
                        </div>

                        <div>
                            <h4 className="opacity-60 text-base">Up next</h4>
                            <TeamRoadmap team={team} />
                        </div>
                    </div>
                </section>

                <section id="questions" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            View {product.lowercase} questions
                        </CallToAction>
                    </div>

                    <Questions topicIds={[347]} />
                </section>

                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div>
            <div className="max-w-7xl mx-auto relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductSurveys
