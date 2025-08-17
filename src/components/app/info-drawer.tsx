"use client"

import { useState } from "react"
import { HelpCircle, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function InfoDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Fixed question mark icon at bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-8 h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
        aria-label="About this app"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

            {/* Right-side drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="flex flex-col h-full">
          <div className="p-4 border-b border-border -mx-6 -mt-6 mb-4 sticky top-0 bg-background z-10">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Close
              </Button>
            </SheetClose>
          </div>
          <ScrollArea className="flex-grow w-full touch-pan-y -mx-6 px-6">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="text-2xl text-primary tracking-tight">
                About idioViet
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 text-left pb-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-muted-foreground">Contact</h3>
                <p className="text-lg">
                  Email: <span className="text-foreground">placeholder@email.com</span>
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold text-muted-foreground">Content Source</h3>
                <p className="text-lg">
                  The Vietnamese idioms and proverbs in this app are sourced from:{" "}
                  <a
                    href="https://quizlet.com/610151515/flashcards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Vietnamese_with_V4U
                  </a>
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold text-muted-foreground">About This App</h3>
                <p className="text-lg">
                  I created this app as part of my Vietnamese learning journey. The goal is to help
                  learners practice pronunciation and familiarize themselves with common Vietnamese
                  idioms and proverbs.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-semibold text-muted-foreground">Note on Audio</h3>
                <p className="text-lg">
                  The text-to-speech feature could use better voice quality, but it&apos;s okay for now
                  and serves as a helpful pronunciation guide for learning.
                </p>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
