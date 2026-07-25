"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangleIcon className="size-8 text-destructive" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            Something went wrong
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button
            onClick={this.handleRetry}
            variant="outline"
            className="mt-4 gap-2"
          >
            <RefreshCwIcon className="size-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
