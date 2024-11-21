import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { IconX } from '@posthog/icons'
import Replayer from 'components/Replayer'
import { useReplayPreview } from 'hooks/useReplayPreview'
import Link from 'components/Link'

const Arrow = ({ className = '' }: { className: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 20" width="52">
        <path
            fill="red"
            fillRule="evenodd"
            d="M47.087 18.492c-.289.173-.693.173-1.04.232-.116 0-.232 0-.347.057-.173.057-.348.057-.577.057-.173 0-.348.057-.52 0h-.52c-.232 0-.404-.116-.636-.116-.057 0-.116-.057-.173-.057-.231-.116-.52-.116-.751-.057-.232.057-.405.116-.636.057a.453.453 0 0 0-.463.116c-.116.116-.232.116-.348 0-.056 0-.115-.057-.172-.057-.116 0-.173.116-.232.116-.116 0-.172-.057-.288-.057-.232.057-.404 0-.636 0-.116 0-.232 0-.347.057-.405.172-.405.172-.636.116a.375.375 0 0 0-.348 0c-.115 0-.172.056-.288.056-.463-.056-.983 0-1.444 0-.173 0-.404 0-.577.116-.232.116-.52.173-.752.116-.115 0-.288 0-.404-.057a2.847 2.847 0 0 0-.983 0c-.404.057-.867 0-1.272 0-.288 0-.52-.057-.808 0-.232.057-.463 0-.752-.057a.813.813 0 0 0-.52 0c-.056 0-.172.057-.231.057h-.636c-.404 0-.751-.057-1.156-.057-.172 0-.404-.057-.636-.057-.52-.056-1.04-.115-1.56-.172-.172 0-.347-.057-.576-.116-.116 0-.232 0-.348-.057h-.172c-.348-.231-.809-.116-1.213-.288h-.173c-.288.115-.576 0-.808-.057a6.16 6.16 0 0 0-.983-.232c-.116 0-.232-.057-.404-.116-.116 0-.173-.056-.289-.056-.172 0-.288 0-.404-.116h-.057c-.636-.173-1.271-.52-1.907-.636-.057 0-.116-.057-.232-.057a2.516 2.516 0 0 0-1.097-.404 3.309 3.309 0 0 1-.808-.288c-.752-.348-1.503-.809-2.196-1.213-.232-.116-.463-.173-.636-.289a1.253 1.253 0 0 1-.463-.288 8.398 8.398 0 0 0-1.156-.809c-.231-.172-.52-.288-.751-.463-.289-.115-.52-.231-.752-.463-.057-.057-.116-.057-.173-.057a.28.28 0 0 0-.347.116c-.057.232-.172.404-.172.636-.057.463-.173.867-.289 1.328-.057.173-.116.348-.116.52 0 .348-.115.693-.288 1.04-.116.173-.173.636-.116.809 0 .057.057.172.057.231 0 .116 0 .232-.057.348a.805.805 0 0 0-.116.636c0 .172-.057.404 0 .635-.057.173-.116.289-.172.463 0 .057-.057.057-.116 0 0 0-.057 0-.057-.056-.116-.173-.173-.348-.116-.577.057-.289-.057-.463-.288-.636l-.057-.057c0-.173 0-.347-.116-.52 0-.057-.057-.057-.116 0-.057.057-.115.116-.115.173a22.967 22.967 0 0 0-.52-1.156 10.814 10.814 0 0 1-.693-1.733c-.116-.347-.232-.751-.347-1.097-.289-.983-.577-1.907-.984-2.772-.172-.405-.347-.868-.576-1.272a5.832 5.832 0 0 1-.405-.867 3.659 3.659 0 0 0-.463-.809c-.231-.52-.636-1.04-.867-1.56a2.427 2.427 0 0 0-.52-.808c.118-.244-.057-.36-.173-.475-.114-.116-.23-.289-.23-.464 0-.172-.115-.404-.23-.576-.117-.116-.117-.289-.232-.405a1.237 1.237 0 0 0-.289-.463c-.116-.172-.231-.345-.347-.52a1.777 1.777 0 0 0-.461-.46A2.48 2.48 0 0 1 .17 1.91c-.173-.174-.23-.404-.116-.579.116-.288.289-.52.577-.635.29-.114.579-.23.926-.289H2.253c.232 0 .404.057.636.057.172.002.345.002.577-.057.23 0 .46.06.692.116.232.057.463.116.693.232.232.115.404.172.636.231l.867.347c.173.116.404.116.577.232.173.116.404.173.577.232.231.056.463.056.636.115.404.116.751.116 1.155.116.116 0 .289 0 .405.057.577.057 1.097.116 1.675.173.289.057.577.057.868.057.808.056 1.617.056 2.427 0 .463-.057.868-.057 1.329-.116.172 0 .347 0 .52.057a.557.557 0 0 0 .52.057c.116 0 .231-.057.404-.057h.288c.463.115.983.172 1.445.288.115 0 .172.057.288.057.347.06.754.118 1.158.118.057 0 .116.057.116.057.056.057 0 .115-.057.172-.173.116-.348.289-.577.348-.522.29-1.042.52-1.621.751-.232.057-.404.116-.636.173-.52.175-1.097.29-1.617.347-.636.06-1.212.175-1.791.289-.116 0-.173.057-.289.057-.52.056-.983.056-1.503.115-.404-.057-.867.116-1.271.057-.348 0-.636.057-.925.057-.056 0-.115.057-.172.057-.057 0-.116.116-.057.173.057.178.116.235.172.351l.693.693c.173.115.289.288.463.404.348.288.636.692 1.04.924.289.347.693.693 1.04 1.04.348.288.693.577 1.04.867.463.348.983.693 1.444 1.04.577.348 1.097.752 1.733 1.04.463.232.867.463 1.272.693.52.288 1.04.577 1.56.808.231.116.463.232.751.289.232.116.463.173.752.288.116.057.231.116.347.116.636.173 1.272.404 1.848.636.116.057.232.116.348.116.404.115.808.172 1.271.288.057 0 .116 0 .173.057.752.232 1.56.347 2.369.52.115 0 .172 0 .288.057.173.057.347.057.577.116.404.116.751.172 1.156.172.347.057.692.116 1.04.057h1.04c.404 0 .867 0 1.271.057.173 0 .347.057.52 0 .289-.057.577-.057.868 0 .231 0 .463.057.692.057.173 0 .348.057.463.173.116.116.232.116.404.172.116 0 .173.057.289.057h.232c.288-.116.635-.116.924-.116a7 7 0 0 1 1.156.116c.115 0 .172.057.231.173.057.057.116.116.173.116h.692c.577 0 1.097-.057 1.676 0 .232.056.404-.057.577-.173l.173-.173c.115-.116.288-.116.404-.116.057 0 .116.057.173.057.231.057.463.057.692.057.116 0 .173 0 .289-.057.404-.115.867-.115 1.271-.115.116 0 .173 0 .289.056.231.173.52.289.867.232.173 0 .347.057.577.057h1.328l.057.057c0 .057 0 .057-.057.116-.115.056-.231.056-.347.115-.057 0-.116.057-.173.057 0 0-.056.057-.056.116 0 .057 0 .057.056.116.057 0 .116.057.173.057h.347c.116.116.173.288.232.404l-.057.057c-.286.014-.402.073-.518.073-.463.057-.867.173-1.328.288-.057 0-.116.057-.173.057-.404 0-.808.116-1.213.173h-.056c-.289.057-.577.116-.868.116a.825.825 0 0 0-.404.116v.115s0 .057.057.057h.057c.231 0 .52.057.808.057.057 0 .173 0 .173-.057a.655.655 0 0 1 .463-.172c.116 0 .172.056.288.056a.375.375 0 0 0 .348 0c.059-.113.231-.056.404-.056Zm-6.76-1.5c.116 0 .232-.058.347-.058v-.113c-.172-.116-.404-.116-.636-.057 0 0-.056.057-.056.116 0 .057.056.116.115.116.057-.005.114-.005.23-.005Zm-32.181-.52h-.057v.056c.057.173.116.405.172.577 0 .057.057.057.116.116h.057l.057-.057v-.057c-.057-.116-.116-.172-.173-.288-.056-.116-.115-.232-.172-.348Zm39.288.808c.116 0 .232-.057.289-.057 0 0 .057-.057.057-.116 0-.057 0-.057-.057-.057a.5.5 0 0 0-.404 0c-.057 0-.057.057-.116.116v.116c.115-.059.172-.059.231-.002Zm.289.116c-.057 0-.057.056-.116.056h.057c.002 0 .059 0 .059-.056Zm.463-.06c-.057.058-.057.058 0 .058 0 .059.057.002 0-.057.057.059.057 0 0 0Zm-8.668-.403h-.056v.056c0-.056 0-.056.056-.056Zm3.525-.346c-.057 0-.057 0 0 0 0 .057-.057.057 0 0ZM51.883 16.933c-.056.115-.172.172-.231.172-.232 0-.404-.057-.636-.057h-.057s-.057-.056-.057-.115c0 0 0-.057.057-.057.116-.057.289-.116.404-.057.173.057.348.057.52.114Z"
            clipRule="evenodd"
        />
        <path
            fill="red"
            fillRule="evenodd"
            d="M41.655 16.412h-.116c.059-.057.116-.057.116 0ZM47.492 18.436c-.057-.06-.057-.06 0 0 .059 0 .059-.06 0 0ZM51.999 17.336h-.116.057c.002 0 .002.06.059 0Z"
            clipRule="evenodd"
        />
    </svg>
)

export function ReplayPreview(): JSX.Element {
    const { replayEvents, replayReady } = useReplayPreview()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (replayReady) {
            setVisible(true)
        }
    }, [replayReady])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ translateY: '200%', opacity: 0 }}
                    animate={{ translateY: '0%', opacity: 1 }}
                    exit={{ translateY: '200%', opacity: 0 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <Link
                        onClick={() => setVisible(false)}
                        to="/session-replay"
                        className="bg-white dark:bg-accent-dark rounded-md border border-border dark:border-dark p-4 shadow-xl flex space-x-8 max-w-[420px] items-center hover:scale-[1.01] active:scale-100 transition-transform"
                    >
                        <Replayer events={replayEvents} configProps={{ height: 100, width: 170 }} />
                        <div>
                            <div className="flex items-center space-x-1">
                                <span className="animate-[blink_1.5s_ease-in-out_infinite] size-2 bg-[#f00] rounded-full inline-block -ml-4"></span>
                                <strong className="text-[15px]">Session replay live demo</strong>
                            </div>
                            <p className="text-[13px] -ml-0.5 mb-0.5 leading-snug">See what you just did on posthog.com</p>
                            <div className="relative font-squeak text-[#f00] uppercase text-[13px] pl-7 pt-1">
                                <Arrow className="absolute left-[-28px] bottom-2 top-0" />
                                <span className="inline-block transform -rotate-2 text-base">You, seconds ago!</span>
                            </div>
                        </div>
                    </Link>
                    <button
                        className="bg-white dark:bg-accent-dark border border-border dark:border-dark rounded-full p-1 absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"
                        onClick={() => setVisible(false)}
                    >
                        <IconX className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
